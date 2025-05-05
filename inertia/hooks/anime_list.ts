import { useEffect, useState } from 'react'
import { fetchAnimes } from '~/pages/animes/fetch'
import type { Animes, Anime, AnimeSettings } from '~/types/anime.type'
import type { Sort } from '~/types/sort.type'

export const useAnimeList = (csrf: string) => {
  const [stopScroll, setStopScroll] = useState<boolean>(false)
  const [animes, setAnimes] = useState<Anime[]>([])
  const [animesFiltered, setAnimesFiltered] = useState<Anime[]>([])
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

  const getAnimes = async () => {
    if (!settings.hasNextPage) return
    const data: Animes | null = await fetchAnimes(
      csrf,
      settings.page,
      settings.limit,
      settings.search,
      settings.genres,
      settings.sort,
      settings.sortOrder
    )
    if (!data) return setTimeout(() => getAnimes(), 1000)
    setAnimes((prev) => {
      const animeIds = new Set(prev.map((anime) => anime.id))
      const newAnimes = data.media.filter((anime) => !animeIds.has(anime.id))
      return [...prev, ...newAnimes]
    })
    setSettings((prev) => ({
      ...prev,
      page: data.pageInfo.hasNextPage ? settings.page + 1 : settings.page,
      hasNextPage: data.pageInfo.hasNextPage,
      total: data.pageInfo.total,
    }))
  }

  const getAnimesFiltered = async () => {
    const data: Animes | null = await fetchAnimes(
      csrf,
      1,
      5000,
      settings.search,
      settings.genres,
      settings.sort,
      settings.sortOrder
    )
    if (!data) return
    setAnimesFiltered((prev) => {
      const animeIds = new Set(prev.map((anime) => anime.id))
      const newAnimes = data.media.filter((anime) => !animeIds.has(anime.id))
      return [...prev, ...newAnimes]
    })
  }

  useEffect(() => {
    const { page, hasNextPage } = settings
    if (page === 1) {
      getAnimes().then(() => setLoading(false))
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasNextPage &&
        !stopScroll &&
        !loading
      ) {
        setLoading(true)
        getAnimes().then(() => setLoading(false))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [csrf, loading, settings])

  useEffect(() => {
    if (settings.search && settings.search.trim() !== '') {
      setLoading(true)
      setStopScroll(true)
      settings.search.trim().toLowerCase()
      const filtered = animes.filter(
        (anime) =>
          anime.title.english?.toLowerCase().includes(settings.search!.toLowerCase()) ||
          anime.title.romaji?.toLowerCase().includes(settings.search!.toLowerCase())
      )
      setAnimesFiltered(filtered)
      getAnimesFiltered().then(() => setLoading(false))
    } else {
      setSettings((prev) => ({ ...prev, search: null }))
      setStopScroll(false)
      setAnimesFiltered(animes)
    }
  }, [animes, settings.search])

  return {
    animes: animesFiltered,
    loading,
    setSearch: (search: string | null) => setSettings((prev) => ({ ...prev, search })),
  }
}
