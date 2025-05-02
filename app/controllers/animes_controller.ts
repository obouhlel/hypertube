import type { HttpContext } from '@adonisjs/core/http'
import { AnimeService } from '#services/Animes/animes_service'

export default class AnimesController {
  async show({ inertia }: HttpContext) {
    const service = new AnimeService()
    try {
      const animes = await service.fetchAnimeInfo()
      return inertia.render('animes/list', { animes })
    } catch {
      return inertia.render('errors/server_error')
    }
  }
}
