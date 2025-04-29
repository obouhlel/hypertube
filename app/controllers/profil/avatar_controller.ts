import type { HttpContext } from '@adonisjs/core/http'
import { avatarValidator } from '#validators/avatar'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'

export default class AvatarController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profil/avatar')
  }

  async store({ request, response, session, auth }: HttpContext) {
    const { avatar } = await request.validateUsing(avatarValidator)
    try {
      const user = auth.getUserOrFail()
      const fileName = `${user.id}-${user.username}.${avatar.extname}`
      const publicPath = app.publicPath('uploads')
      const oldAvatarUrl: string = user.avatar_url

      await avatar.move(publicPath, {
        name: fileName,
        overwrite: true,
      })

      user.avatar_url = `/uploads/${fileName}`
      await user.save()
      session.flash('success', 'Your avatar has been successfully updated')

      if (!oldAvatarUrl.startsWith('https')) {
        const oldAvatarPath = join(publicPath, oldAvatarUrl.replace('/uploads/', ''))
        await unlink(oldAvatarPath)
      }

      return response.redirect().back()
    } catch {
      session.flash('error', 'Failed to upload the avatar to server')
      return response.redirect('/profil/avatar')
    }
  }
}
