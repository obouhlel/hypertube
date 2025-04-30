import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'
import { generateUsername } from '../../utils/generate_username.js'

export default class DiscordAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async callback({ ally, response, session, auth }: HttpContext) {
    const discord = ally.use('discord')

    if (discord.accessDenied()) {
      session.flash('error', 'Access was denied to your Discord account.')
      return response.redirect('/auth/register')
    }

    if (discord.stateMisMatch()) {
      session.flash('error', 'Invalid state parameter. Try the authentication again.')
      return response.redirect('/auth/register')
    }

    if (discord.hasError()) {
      session.flash('error', 'An error occurred during Discord authentication.')
      return response.redirect('/auth/register')
    }

    try {
      const discordUser = await discord.user()
      const username = await generateUsername(discordUser.nickName)

      const user = await User.firstOrCreate(
        { email: discordUser.email },
        {
          username: username,
          last_name: '',
          first_name: '',
          avatar_url: discordUser.avatarUrl,
          password: string.generateRandom(64),
          language: 'en',
        }
      )

      const token = await hash.make(discordUser.token.token)
      await Token.firstOrCreate(
        { userId: user.id, type: 'DISCORD' },
        {
          userId: user.id,
          type: 'DISCORD',
          token: token,
          expiresAt: discordUser.token.expiresAt
            ? DateTime.fromJSDate(discordUser.token.expiresAt)
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
