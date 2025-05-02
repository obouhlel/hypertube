import type { HttpContext } from '@adonisjs/core/http'
import { AnimeService } from '#services/Animes/animes_service'
import { paginationValidator } from '#validators/pagination'

export default class AnimesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('animes/list')
  }

  async fetchPagination({ request, response }: HttpContext) {
    const { page, limit } = await request.validateUsing(paginationValidator)
    const services = new AnimeService()

    try {
      const animes = await services.fetchAnimeInfo(page, limit)
      return response.json(animes)
    } catch {
      return response.status(500).json({ error: 'Error fetching animes from the service Anilist' })
    }
  }
}
