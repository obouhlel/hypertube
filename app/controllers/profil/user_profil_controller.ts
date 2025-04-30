import type { HttpContext } from '@adonisjs/core/http'
import { editProfilValidator } from '#validators/edit_profil'

export default class UserProfilController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profil/edit')
  }

  async update({ request, session, response, auth }: HttpContext) {
    let user = null
    try {
      user = auth.getUserOrFail()
    } catch {
      session.flash('error', 'User not authenticated')
      return response.redirect('/')
    }
    const payload = await request.validateUsing(editProfilValidator(user))
    try {
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
