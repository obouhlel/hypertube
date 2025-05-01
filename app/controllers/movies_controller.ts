import type { HttpContext } from '@adonisjs/core/http'
import { MoviesService } from '#services/Movies/movies_service'

export default class MoviesController {
  async show({ inertia }: HttpContext) {
    const service = new MoviesService()
    try {
      const movies = await service.fetchMovies()
      return inertia.render('movies/list', { movies })
    } catch {
      return inertia.render('errors/server_error')
    }
  }
}
