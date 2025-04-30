import type { HttpContext } from '@adonisjs/core/http'
import { generateUsername } from '../../utils/generate_username.js'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'

export default class GoogleAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async callback({ ally, response, session, auth }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      session.flash('error', 'Access was denied to your Google account.')
      return response.redirect('/auth/register')
    }

    if (google.stateMisMatch()) {
      session.flash('error', 'Invalid state parameter. Try the authentication again.')
      return response.redirect('/auth/register')
    }

    if (google.hasError()) {
      session.flash('error', 'An error occurred during Google authentication.')
      return response.redirect('/auth/register')
    }

    try {
      const googleUser = await google.user()
      const username = await generateUsername(googleUser.nickName)

      const user = await User.firstOrCreate(
        { email: googleUser.email },
        {
          username: username,
          first_name: googleUser.original.given_name,
          last_name: googleUser.original.family_name,
          avatar_url: googleUser.original.picture,
          password: string.generateRandom(64),
          language: 'en',
        }
      )
      const token = await hash.make(googleUser.token.token)
      await Token.firstOrCreate(
        { userId: user.id, type: 'GOOGLE' },
        {
          userId: user.id,
          type: 'GOOGLE',
          token: token,
          expiresAt: googleUser.token.expiresAt
            ? DateTime.fromJSDate(googleUser.token.expiresAt)
            : undefined,
        }
      )

      await auth.use('web').login(user)
      return response.redirect('/')
    } catch {
      session.flash('error', 'The email are already taken, please try a forgot password.')
      return response.redirect('/forgot-password')
    }
  }
}
