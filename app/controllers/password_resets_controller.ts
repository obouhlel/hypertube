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

  public async send({ request, inertia }: HttpContext) {
    const { email } = await request.validateUsing(emailValidator)
    const user = await User.findBy('email', email)

    if (!user) {
      return inertia.render('password/forgot', {
        errors: ['No account found with this email address'],
      })
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

    return inertia.render('password/forgot', {
      message:
        'You will receive a password reset link shortly, after you have 1 hour to reset your password',
    })
  }

  public async reset({ inertia, params }: HttpContext) {
    const token = params.token
    if (!token) {
      return inertia.render('password/reset')
    }
    const isValid = await Token.verify(token)
    return inertia.render('password/reset', { isValid, token })
  }

  public async store({ request, inertia }: HttpContext) {
    const { token, new_password: newPassword } = await request.validateUsing(newPasswordValidator)
    const user = await Token.getPasswordResetUser(token)

    if (!user) {
      return inertia.render('password/reset', {
        errors: ['No account found'],
      })
    }

    await user.merge({ password: newPassword }).save()
    return inertia.render('login', {
      message: 'Password update, try to connect',
    })
  }
}
