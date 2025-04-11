import type { HttpContext } from '@adonisjs/core/http'
import { emailValidator, newPasswordValidator } from '#validators/password_reset'
import User from '#models/user'
import Token from '#models/token'
import env from '#start/env'
import router from '@adonisjs/core/services/router'
import mail from '@adonisjs/mail/services/main'

// TODO: Changer le type de reponse pour que ca ouvre pas une popup d'inertia
export default class PasswordResetsController {
  public async forgot({ inertia }: HttpContext) {
    return inertia.render('password/forgot')
  }

  public async send({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(emailValidator)
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).json({
        errors: {
          email: ['No account found with this email address'],
        },
      })
    }
    const token = await Token.generatePasswordResetToken(user)
    const resetLink = router.makeUrl('/password-reset', [token]) // TODO: Trouver ou il stock le token

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
    response.status(200).json({
      message: 'You will receive a password reset link shortly',
    })
  }

  public async reset({ inertia, params }: HttpContext) {
    const token = params.token // TODO: Trouver le token dans l'url
    if (!token) {
      return inertia.render('password/reset')
    }
    const isValid = await Token.verify(token)
    return inertia.render('password/reset', { isValid, token })
  }

  public async store({ request, response }: HttpContext) {
    const { token, new_password: newPassword } = await request.validateUsing(newPasswordValidator)
    const user = await Token.getPasswordResetUser(token)

    if (!user) {
      return response.status(404).json({
        errors: {
          email: ['No account found'],
        },
      })
    }
    await user.merge({ password: newPassword }).save()
    response.status(200).json({
      message: 'Password update, try to connect',
    })
  }
}
