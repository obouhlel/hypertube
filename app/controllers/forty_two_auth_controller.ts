import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'

export default class FortyTwoAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('fortytwo').redirect()
  }

  async callback({ ally, inertia, auth }: HttpContext) {
    const fortytwo = ally.use('fortytwo')

    if (fortytwo.accessDenied()) {
      return inertia.render('login', { errors: 'Access to GitHub was denied.' })
    }

    if (fortytwo.stateMisMatch()) {
      return inertia.render('login', { errors: 'State mismatch detected. Please try again.' })
    }

    if (fortytwo.hasError()) {
      return inertia.render('login', {
        errors: 'An unknown error occurred during GitHub authentication.',
      })
    }
    try {
      const fortyTwoUser = await fortytwo.user()

      const user = await User.firstOrCreate(
        {
          email: fortyTwoUser.email as string,
          username: fortyTwoUser.original.login,
        },
        {
          username: fortyTwoUser.original.login,
          first_name: fortyTwoUser.original.first_name,
          last_name: fortyTwoUser.original.last_name,
          password: string.generateRandom(64),
          avatar_url: fortyTwoUser.avatarUrl || '',
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

      return inertia.render('home')
    } catch {
      return inertia.render('register', {
        messages: ['Your email or username is already taken, please register'],
      })
    }
  }
}
