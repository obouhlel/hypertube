import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ShowUserProfilController {
  async show({ inertia, params }: HttpContext) {
    const id = params.id
    if (!id) inertia.render('errors/not_found')
    const otherUser = await User.find(id)
    if (!otherUser) return inertia.render('errors/not_found')
    return inertia.render('profil/id', { otherUser })
  }
}
