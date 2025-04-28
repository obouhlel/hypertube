import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import Token from '#models/token'

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

      const user = await User.firstOrCreate(
        { email: discordUser.email, username: discordUser.nickName },
        {
          last_name: 'None',
          first_name: 'None',
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

      session.flash(
        'success',
        'Your account has been created with a random password. If you need to change it, use the forgot password option. Update your profil for your first name, and last name.'
      )
      return response.redirect('/')
    } catch (e) {
      console.log(e)
      session.flash('error', 'The username or email are already taken, please register.')
      return response.redirect('/auth/register')
    }
  }
}
