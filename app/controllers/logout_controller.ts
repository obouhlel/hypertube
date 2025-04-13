import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Already disconnected.')
    return response.redirect('/')
  }
}
