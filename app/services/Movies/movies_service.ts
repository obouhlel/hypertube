import axios from 'axios'
import Movies, { MovieSort } from './movies.type.js'

export class MoviesService {
  private apiURL: string = 'https://yts.mx/api/v2/list_movies.json'

  constructor() {}

  async fetchMovies(
    page: number = 1,
    limit: number = 20,
    sort: MovieSort = 'title'
  ): Promise<Movies> {
    try {
      const response = await axios.get(this.apiURL, {
        params: {
          page,
          limit,
          sort_by: sort,
          order_by: 'asc',
        },
      })

      if (response.data && response.data.status === 'ok') {
        return {
          medias: response.data.data.movies,
          movie_count: response.data.data.movie_count,
          page_number: response.data.data.page_number,
          limit: response.data.data.limit,
        }
      } else {
        throw new Error('Failled to fetch movies')
      }
    } catch (error) {
      console.error('Error fetching movies:', error.message)
      throw new Error('An error occured while fetching movies')
    }
  }
}
