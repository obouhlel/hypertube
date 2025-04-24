import type { HttpContext } from '@adonisjs/core/http'
import { emailValidator, newPasswordValidator } from '#validators/password_reset'
import User from '#models/user'
import Token from '#models/token'
import env from '#start/env'
import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

export default class PasswordResetsController {
  public async forgot({ inertia }: HttpContext) {
    return inertia.render('password/forgot')
  }

  public async send({ request, response, session }: HttpContext) {
    const { email } = await request.validateUsing(emailValidator)
    const user = await User.findBy('email', email)

    if (!user) {
      session.flash('error', 'No account found with this email address')
      return response.redirect('/forgot-password')
    }

    const token = await Token.generatePasswordResetToken(user)
    const resetLink = router.makeUrl('password.reset', [token])

    await mail.sendLater((message) => {
      message.from('noreply@obouhlel.xyz').to(user.email).subject('Password Reset on Hypertube')
        .html(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333;">Hypertube Password Reset</h1>
        </div>
        <div style="color: #555; line-height: 1.5;">
          <p>Hello,</p>
          <p>We received a request to reset your Hypertube account password. If you did not make this request, please ignore this email.</p>
          <p>To reset your password, click the button below. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
          <a href="${env.get('DOMAIN')}${resetLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">${env.get('DOMAIN')}${resetLink}</p>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>Regards,<br>The Hypertube Team</p>
        </div>
        </div>
      `)
    })

    session.flash(
      'success',
      'You will receive a password reset link shortly, after you have 1 hour to reset your password'
    )
    return response.redirect('/forgot-password')
  }

  public async reset({ inertia, params }: HttpContext) {
    const token = params.token
    if (!token) {
      return inertia.render('password/reset')
    }
    const isValid = await Token.verify(token, 'PASSWORD_RESET')
    return inertia.render('password/reset', { isValid, token })
  }

  public async store({ request, response, session }: HttpContext) {
    const { token, new_password: newPassword } = await request.validateUsing(newPasswordValidator)
    const user = await Token.getTokenUser(token, 'PASSWORD_RESET')

    if (!user) {
      session.flash('error', 'Account not found')
      return response.redirect('/auth/register')
    }

    await user.merge({ password: newPassword }).save()
    session.flash('success', 'Password updated, try to connect')
    return response.redirect('/auth/login')
  }
}
