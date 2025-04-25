import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(username, password)
    try {
      await auth.use('web').login(user)
      await auth.authenticate()
      if (auth.user && session.has('isVerifingMail')) {
        auth.user.isEmailVerified = true
        auth.user.save()
      }
    } catch {
      session.flash('error', 'Authentication failed. Please check your credentials and try again.')
      return response.redirect('/auth/login')
    }
    return response.redirect('/')
  }
}
