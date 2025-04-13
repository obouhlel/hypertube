import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'

export default class GithubAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('github').redirect((request) => {
      request.scopes(['user'])
    })
  }

  async callback({ ally, response, session, auth }: HttpContext) {
    const github = ally.use('github')

    if (github.accessDenied()) {
      session.flash('error', 'Access was denied to your GitHub account.')
      return response.redirect('/auth/login')
    }

    if (github.stateMisMatch()) {
      session.flash('error', 'Invalid state parameter. Try the authentication again.')
      return response.redirect('/auth/login')
    }

    if (github.hasError()) {
      session.flash('error', 'An error occurred during GitHub authentication.')
      return response.redirect('/auth/login')
    }

    try {
      const githubUser = await github.user()

      const user = await User.firstOrCreate(
        { email: githubUser.email, username: githubUser.original.login },
        {
          username: githubUser.original.login,
          first_name: githubUser.name?.split(' ')[0] || '',
          last_name: githubUser.name?.split(' ')[1] || '',
          password: string.generateRandom(64),
          language: 'en',
        }
      )

      const token = await hash.make(githubUser.token.token)
      await Token.firstOrCreate(
        { userId: user.id, type: 'GITHUB' },
        {
          userId: user.id,
          type: 'GITHUB',
          token: token,
          expiresAt: null,
        }
      )

      await auth.use('web').login(user)

      session.flash(
        'success',
        'Your account has been created with a random password. If you need to change it, use the forgot password option.'
      )
      return response.redirect('/')
    } catch {
      session.flash('error', 'The username or email are already taken, please register.')
      return response.redirect('/auth/register')
    }
  }
}
