import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class RegisterController {
  async show({ inertia }: HttpContext) {
    return inertia.render('register')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    await User.create(payload)
    return response.redirect('/auth/login')
  }
}
