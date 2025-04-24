import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
