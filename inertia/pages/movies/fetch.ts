import axios from 'axios'
import Movies, { Movie } from '~/types/movies.type'

export const fetchMovies = async (
  page: number,
  csrf: string,
  setLoading: (isLoading: boolean) => void,
  setAnimes: (value: React.SetStateAction<any[]>) => void,
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
      setAnimes((prevAnimes) => {
        const animeIds = new Set(prevAnimes.map((anime) => anime.id))
        const newAnimes = data.medias.filter((anime: Movie) => !animeIds.has(anime.id))
        return [...prevAnimes, ...newAnimes]
      })
      setPage((prevPage) => prevPage + 1)
      setLoading(false)
    }
  } catch {
    setTimeout(() => fetchMovies(page, csrf, setLoading, setAnimes, setPage), 5000)
  }
}
