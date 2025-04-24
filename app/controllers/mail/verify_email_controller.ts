import Token from '#models/token'
import type { HttpContext } from '@adonisjs/core/http'

export default class VerifyEmailController {
  async send({ auth, session, response }: HttpContext) {
    try {
      await auth.authenticate()
      auth.user?.sendVerifyEmailToken()
    } finally {
      session.flash('success', 'Verification email has been sent to your address')
    }
    return response.redirect().back()
  }

  async verify({ response, session, params, auth }: HttpContext) {
    try {
      const user = await Token.getTokenUser(params.token, 'VERIFY_EMAIL')
      await auth.authenticate()
      const isMatch: boolean = user?.id === auth.user?.id

      if (!user || !isMatch) {
        session.flash('token', 'Your token is invalid or expired')
        return response.redirect('/')
      }

      user.isEmailVerified = true
      await user.save()
      session.flash('success', 'Your email has been successfully verified')
      return response.redirect().back()
    } catch {
      session.flash('error', 'An error occurred while verifying your email. Please try again.')
      return response.redirect('/')
    }
  }
}
