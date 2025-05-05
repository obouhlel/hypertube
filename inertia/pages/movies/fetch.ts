import axios from 'axios'
import Movies, { Movie } from '~/types/movies.type'

export const fetchMovies = async (
  page: number,
  csrf: string,
  setLoading: (isLoading: boolean) => void,
  setMovies: (value: React.SetStateAction<any[]>) => void,
  setPage: (value: React.SetStateAction<number>) => void
) => {
  try {
    const { data, status } = await axios.post<Movies>(
      '/movies/pagination',
      {
        page,
        limit: 20,
      },
      {
        headers: {
          'X-CSRF-TOKEN': csrf,
        },
      }
    )
    if (status === 200 && data.medias) {
      setMovies((prevMovies) => {
        const movieIds = new Set(prevMovies.map((movie) => movie.id))
        const newMovies = data.medias.filter((movie: Movie) => !movieIds.has(movie.id))
        return [...prevMovies, ...newMovies]
      })
      setPage((prevPage) => prevPage + 1)
      setLoading(false)
    }
  } catch {
    setTimeout(() => fetchMovies(page, csrf, setLoading, setMovies, setPage), 5000)
  }
}
