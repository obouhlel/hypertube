import type { HttpContext } from '@adonisjs/core/http'
import { AnimeService } from '#services/Animes/animes_service'
import { animesValidator, mediasValidator } from '#validators/medias'
import { AnimeSort } from '#services/Animes/anime.type'

export default class AnimesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('animes/list')
  }

  async pagination({ request, response }: HttpContext) {
    const { page, limit } = await request.validateUsing(mediasValidator)
    const service = new AnimeService()

    try {
      const animes = await service.fetchAnilistPagination(page, limit)
      return response.json(animes)
    } catch {
      return response.status(500).json({ error: 'Error fetching animes from the service Anilist' })
    }
  }

  async search({ request, response }: HttpContext) {
    const { page, limit, search, genres, sort } = await request.validateUsing(animesValidator)
    const service = new AnimeService()

    try {
      const animes = await service.fetchAnilistSearch(
        page,
        limit,
        search,
        genres,
        sort as AnimeSort[]
      )
      return response.json(animes)
    } catch {
      return response.status(500).json({ error: 'Error fetching animes from the service Anilist' })
    }
  }
}
