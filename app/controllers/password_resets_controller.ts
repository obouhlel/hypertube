import type { HttpContext } from '@adonisjs/core/http'
import { emailValidator } from '#validators/password_reset'
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
    const token = await Token.generatePasswordResetToken(user)
    const resetLink = router.makeUrl('/password-reset', [token])

    if (user) {
      await mail.sendLater((message) => {
        message
          .from('noreply@hypertube.com')
          .to(user.email)
          .subject('Password Reset on hypertube')
          .html(
            `Reset your password by <a href="${env.get('DOMAIN')}${resetLink}">clicking here</a>`
          )
      })
    }

    session.flash(
      'success',
      'If an account matches the provided email, you will recieve a password reset link shortly'
    )
    return response.redirect().back()
  }

  public async reset({}: HttpContext) {
    // Render the password reset form
  }

  public async store({}: HttpContext) {
    // Handle the password reset
  }
}
