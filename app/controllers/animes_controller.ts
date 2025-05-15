import type { HttpContext } from '@adonisjs/core/http'
import { AnimeService } from '#services/Animes/animes_service'
import { mediasValidator } from '#validators/medias'

export default class AnimesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('animes/list')
  }

  async pagination({ request, response }: HttpContext) {
    const { page, limit } = await request.validateUsing(mediasValidator)
    const service = new AnimeService()

    try {
      const animes = await service.getStream(limit, page)
      return response.json(animes)
    } catch {
      return response.status(500).json({ error: 'Error fetching animes from the service Anilist' })
    }
  }
}
