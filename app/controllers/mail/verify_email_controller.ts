import Token from '#models/token'
import type { HttpContext } from '@adonisjs/core/http'

export default class VerifyEmailController {
  async index({ inertia }: HttpContext) {
    return inertia.render('home')
  }

  async verify({ response, session, params, auth }: HttpContext) {
    try {
      const user = await Token.getTokenUser(params.token, 'VERIFY_EMAIL')
      const isMatch = user?.id === auth.user?.id

      await auth.authenticate()

      if (!auth.user) {
        session.put('isVerifingEmail', true)
        return response.redirect('/auth/login')
      }

      if (!user || !isMatch) {
        session.flash('token', 'Your token is invalid or expired')
        return response.redirect('/')
      }

      user.is_email_verified === true
      await user.save()
    } catch {
      session.flash('error', 'An error occurred while verifying your email. Please try again.')
      return response.redirect('/')
    }

    return response.redirect('/')
  }
}
