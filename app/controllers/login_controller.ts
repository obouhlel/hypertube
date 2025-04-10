import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, auth }: HttpContext) {
    const { email, password, remember } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const rememberOpt = remember ?? false
    await auth.use('web').login(user, rememberOpt)
    return response.redirect('/')
  }
}
