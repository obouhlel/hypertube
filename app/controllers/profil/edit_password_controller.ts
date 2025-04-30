import { EditPassword } from '#validators/edit_password'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

export default class EditPasswordController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profil/password')
  }

  async update({ request, response, session, auth }: HttpContext) {
    let user = null
    try {
      user = auth.getUserOrFail()
    } catch {
      session.flash('error', 'User not authenticated')
      return response.redirect('/')
    }
    const {
      username,
      password,
      new_password: newPassword,
    } = await request.validateUsing(EditPassword)

    try {
      if (user.username !== username) {
        throw new Error('Unauthorized: Unable to modify password for another user')
      }
      const isSame = await hash.verify(user.password, password)
      if (!isSame) {
        throw new Error('Incorrect current password')
      }
      user.password = newPassword
      user.save()
      session.flash('success', 'Password has been updated successfully')
      return response.redirect('/')
    } catch (e) {
      session.flash('error', e)
      return response.redirect().back()
    }
  }
}
