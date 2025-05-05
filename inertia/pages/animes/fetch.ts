import axios from 'axios'
import type { Anime, Animes } from '~/types/anime.type'

export const fetchAnimes = async (
  page: number,
  csrf: string,
  setLoading: (isLoading: boolean) => void,
  setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>,
  setHasNextPage: (hasNextPage: boolean) => void,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  hasNextPage: boolean
) => {
  try {
    const { data } = await axios.post<Animes>(
      '/animes/pagination',
      { page, limit: 20 },
      { headers: { 'X-CSRF-TOKEN': csrf } }
    )

    if (data.media) {
      setAnimes((prevAnimes) => {
        const animeIds = new Set(prevAnimes.map((anime) => anime.id))
        const newAnimes = data.media.filter((anime) => !animeIds.has(anime.id))
        return [...prevAnimes, ...newAnimes]
      })
      setHasNextPage(data.pageInfo.hasNextPage)
      if (hasNextPage) setPage((prevPage) => prevPage + 1)
    }
  } catch (error) {
    console.error('Error fetching animes:', error)
  } finally {
    setLoading(false)
  }
}
