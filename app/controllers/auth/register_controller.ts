import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class RegisterController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const avatarUrl = `https://ui-avatars.com/api/?name=${payload.first_name}+${payload.last_name}?background=random?bold=true`
      await User.create({ avatar_url: avatarUrl, ...payload })
      session.flash('success', 'Your account has been created. Please login.')
      return response.redirect('/auth/login')
    } catch {
      session.flash('error', 'Failed to create account. Please try again.')
      return response.redirect().back()
    }
  }
}
