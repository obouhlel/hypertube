import { useEffect, useState } from 'react'
import { fetchAnimes } from '~/pages/animes/fetch'
import type { Anime, AnimeSettings } from '~/types/anime.type'
import type { Sort } from '~/types/sort.type'

export const useAnimeList = (csrf: string) => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [settings, setSettings] = useState<AnimeSettings>({
    page: 1,
    limit: 20,
    search: null,
    genres: null,
    sort: 'asc' as Sort,
    sortOrder: ['TITLE_ENGLISH'],
    hasNextPage: true,
  })

  useEffect(() => {
    const { page, hasNextPage } = settings
    if (page === 1) {
      fetchAnimes(csrf, setLoading, setAnimes, settings, setSettings)
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasNextPage &&
        !loading
      ) {
        setLoading(true)
        fetchAnimes(csrf, setLoading, setAnimes, settings, setSettings)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [csrf, loading, settings])

  return { animes, loading }
}
