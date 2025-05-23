import type { HttpContext } from '@adonisjs/core/http'
import { MoviesService } from '#services/Movies/movies_service'
import { paginationValidator } from '#validators/pagination'

export default class MoviesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('movies/list')
  }

  async fetchPagination({ request, response }: HttpContext) {
    const { page, limit } = await request.validateUsing(paginationValidator)
    const services = new MoviesService()

    try {
      const movies = await services.fetchMovies(page, limit)
      return response.json(movies)
    } catch {
      return response.status(500).json({ error: 'Error fetching movies from the service yts' })
    }
  }
}
