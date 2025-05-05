import type { HttpContext } from '@adonisjs/core/http'
import { AnimeService } from '#services/Animes/animes_service'
import { animesValidator } from '#validators/medias'
import { Sort } from '../types/sort.type.js'
import { AnimeSort } from '#services/Animes/anime.type'

export default class AnimesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('animes/list')
  }

  async fetchPagination({ request, response }: HttpContext) {
    const { page, limit, search, genres, sort, sortOrder } =
      await request.validateUsing(animesValidator)
    const services = new AnimeService()

    try {
      const animes = await services.fetchAnimeInfo(
        page,
        limit,
        search,
        genres,
        sort as Sort,
        sortOrder as AnimeSort[]
      )
      return response.json(animes)
    } catch {
      return response.status(500).json({ error: 'Error fetching animes from the service Anilist' })
    }
  }
}
