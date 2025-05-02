import axios from 'axios'
import Animes, { Anime } from '~/types/anime.type'

export const fetchAnimes = async (
  page: number,
  csrf: string,
  setLoading: (isLoading: boolean) => void,
  setAnimes: (value: React.SetStateAction<any[]>) => void,
  setHasNextPage: (hasNextPage: boolean) => void,
  setPage: (value: React.SetStateAction<number>) => void,
  hasNextPage: boolean
) => {
  try {
    const { data, status } = await axios.post<Animes>(
      '/animes/pagination',
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
    if (status === 200 && data.media) {
      setAnimes((prevAnimes) => {
        const animeIds = new Set(prevAnimes.map((anime) => anime.id))
        const newAnimes = data.media.filter((anime: Anime) => !animeIds.has(anime.id))
        return [...prevAnimes, ...newAnimes]
      })
      setHasNextPage(data.pageInfo.hasNextPage)
      if (hasNextPage) {
        setPage((prevPage) => prevPage + 1)
      }
      setLoading(false)
    }
  } catch (error) {
    console.error('Error fetching animes:', error)
    setTimeout(
      () => fetchAnimes(page, csrf, setLoading, setAnimes, setHasNextPage, setPage, hasNextPage),
      5000
    )
  }
}
