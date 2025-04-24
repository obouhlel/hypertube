import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class RegisterController {
  async show({ inertia }: HttpContext) {
    return inertia.render('register')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    await User.create(payload)
    session.flash('success', 'Your account has been created. Please login.')
    return response.redirect('/auth/login')
  }
}
