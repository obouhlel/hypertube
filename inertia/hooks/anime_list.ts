import { useEffect, useState } from 'react'
import { fetchAnimes } from '~/pages/animes/fetch'
import type { Anime } from '~/types/anime.type'

export const useAnimeList = (csrf: string) => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (page === 1) {
      fetchAnimes(page, csrf, setLoading, setAnimes, setHasNextPage, setPage, hasNextPage)
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasNextPage &&
        !loading
      ) {
        setLoading(true)
        fetchAnimes(page, csrf, setLoading, setAnimes, setHasNextPage, setPage, hasNextPage)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, hasNextPage, loading, csrf])

  return { animes, loading }
}
