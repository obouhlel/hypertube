import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, session, auth }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    session.flash('success', 'Already connected.')
    return response.redirect('/')
  }
}
