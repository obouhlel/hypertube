import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request, response, auth, inertia }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    response.redirect('/')
    return inertia.render('home')
  }

  // ok
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    await User.create(payload)
    return response.redirect('/login')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
