import type { HttpContext } from '@adonisjs/core/http'

export default class UserProfilController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profil/me')
  }

  async update({}: HttpContext) {}
}
