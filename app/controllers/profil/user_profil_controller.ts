import type { HttpContext } from '@adonisjs/core/http'
import { editProfilValidator } from '#validators/edit_profil'

export default class UserProfilController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profil/me')
  }

  async update({ request, session, response, auth }: HttpContext) {
    const payload = await request.validateUsing(editProfilValidator(auth.getUserOrFail()))

    try {
      const user = auth.getUserOrFail()
      user.merge(payload)
      user.save()
      session.flash('success', 'Your information was updated')
      return response.redirect('/profil/edit')
    } catch {
      session.flash('error', 'User not found, please check if you are authenticated.')
      return response.redirect().back()
    }
  }
}
