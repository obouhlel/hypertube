import { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'

export default class GithubAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('github').redirect((request) => {
      request.scopes(['user'])
    })
  }

  async callback({ ally, inertia, auth }: HttpContext) {
    const github = ally.use('github')

    if (github.accessDenied()) {
      return inertia.render('login', { errors: 'Access to GitHub was denied.' })
    }

    if (github.stateMisMatch()) {
      return inertia.render('login', { errors: 'State mismatch detected. Please try again.' })
    }

    if (github.hasError()) {
      return inertia.render('login', {
        errors: 'An unknown error occurred during GitHub authentication.',
      })
    }

    const githubUser = await github.user()

    const user = await User.firstOrCreate(
      { email: githubUser.email },
      {
        username: githubUser.original.login,
        first_name: githubUser.name?.split(' ')[0] || '',
        last_name: githubUser.name?.split(' ')[1] || '',
        password: string.generateRandom(64),
        language: 'en',
      }
    )

    await Token.firstOrCreate(
      { userId: user.id, type: 'GITHUB' },
      {
        userId: user.id,
        type: 'GITHUB',
        token: githubUser.token.token,
        expiresAt: null,
      }
    )

    await auth.use('web').login(user)

    return inertia.render('home', {
      message:
        'Your account created, a random password set, if you want change please use forgot password',
    })
  }
}
