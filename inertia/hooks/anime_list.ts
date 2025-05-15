import type Anime from '~/types/anime.type'
import { useEffect, useState } from 'react'
import { fetchPagination } from '~/pages/animes/fetch'

export const useAnimeList = (csrf: string) => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [end, setEnd] = useState<boolean>(false)

  const getAnimes = async () => {
    const data: Anime[] | null = await fetchPagination(csrf, page, 20)
    if (!data) {
      setEnd(true)
      return
    }
    setAnimes(() => {
      const newAnimes = [
        ...animes,
        ...data.filter((anime) => !animes.some((existing) => existing.id === anime.id)),
      ]
      return newAnimes
    })
    setPage((prev) => prev + 1)
    console.log(animes)
  }

  useEffect(() => {
    if (page === 1) {
      getAnimes().then(() => setLoading(false))
      console.log(animes)
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        !end
      ) {
        setLoading(true)
        getAnimes().then(() => setLoading(false))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [csrf, loading, page])

  return { animes, loading }
}
