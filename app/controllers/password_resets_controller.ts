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
      session.flash('errors', {
        messages: ['No account found with this email address'],
      })
      return response.redirect().back()
    }

    const token = await Token.generatePasswordResetToken(user)
    const resetLink = router.makeUrl('password.reset', [token])

    await mail.sendLater((message) => {
      message
        .from('noreply@hypertube.com')
        .to(user.email)
        .subject('Password Reset on hypertube')
        .html(`Reset your password by <a href="${env.get('DOMAIN')}${resetLink}">clicking here</a>`)
    })

    session.flash('success', {
      message: 'You will receive a password reset link shortly',
    })
    return response.redirect().back()
  }

  public async reset({ inertia, params }: HttpContext) {
    const token = params.token
    if (!token) {
      return inertia.render('password/reset')
    }
    const isValid = await Token.verify(token)
    return inertia.render('password/reset', { isValid, token })
  }

  public async store({ request, response, session }: HttpContext) {
    const { token, new_password: newPassword } = await request.validateUsing(newPasswordValidator)
    const user = await Token.getPasswordResetUser(token)

    if (!user) {
      session.flash('errors', {
        messages: ['No account found'],
      })
      return response.redirect().back()
    }

    await user.merge({ password: newPassword }).save()
    session.flash('success', {
      message: 'Password update, try to connect',
    })
    return response.redirect().back()
  }
}
