import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'

export default class FortyTwoAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('fortytwo').redirect()
  }

  async callback({ ally, response, session, auth }: HttpContext) {
    const fortytwo = ally.use('fortytwo')

    if (fortytwo.accessDenied()) {
      session.flash('error', 'Access was denied by 42 authentication.')
      return response.redirect('/auth/register')
    }

    if (fortytwo.stateMisMatch()) {
      session.flash('error', 'Invalid state during authentication.')
      return response.redirect('/auth/register')
    }

    if (fortytwo.hasError()) {
      session.flash('error', 'An error occurred during 42 authentication.')
      return response.redirect('/auth/register')
    }

    try {
      const fortyTwoUser = await fortytwo.user()

      const user = await User.firstOrCreate(
        {
          email: fortyTwoUser.email as string,
          username: fortyTwoUser.original.login,
        },
        {
          first_name: fortyTwoUser.original.first_name,
          last_name: fortyTwoUser.original.last_name,
          avatar_url: fortyTwoUser.avatarUrl as NonNullable<string>,
          password: string.generateRandom(64),
          language: 'en',
        }
      )

      const token = await hash.make(fortyTwoUser.token.token)
      await Token.firstOrCreate(
        { userId: user.id, type: 'FORTYTWO' },
        {
          userId: user.id,
          type: 'FORTYTWO',
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
