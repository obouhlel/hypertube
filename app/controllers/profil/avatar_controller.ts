import type { HttpContext } from '@adonisjs/core/http'

export default class AvatarController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profil/avatar')
  }

  async store({}: HttpContext) {}
}
