import React from 'react'
import axios from 'axios'
import type { Anime, Animes, AnimeSettings } from '~/types/anime.type'

export const fetchAnimes = async (
  csrf: string,
  setLoading: (isLoading: boolean) => void,
  setAnimes: React.Dispatch<React.SetStateAction<Anime[]>>,
  settings: AnimeSettings,
  setSettings: React.Dispatch<React.SetStateAction<AnimeSettings>>
) => {
  try {
    const { page, limit, search, genres, sort, sortOrder } = settings
    const { data } = await axios.post<Animes>(
      '/animes/pagination',
      { page, limit, search, genres, sort, sortOrder },
      { headers: { 'X-CSRF-TOKEN': csrf } }
    )

    if (data.media) {
      setAnimes((prevAnimes) => {
        const animeIds = new Set(prevAnimes.map((anime) => anime.id))
        const newAnimes = data.media.filter((anime) => !animeIds.has(anime.id))
        return [...prevAnimes, ...newAnimes]
      })
      setSettings((prevSettings) => ({
        ...prevSettings,
        hasNextPage: data.pageInfo.hasNextPage,
        page: data.pageInfo.hasNextPage ? prevSettings.page + 1 : prevSettings.page,
      }))
    }
  } catch (error) {
    console.error('Error fetching animes:', error)
  } finally {
    setLoading(false)
  }
}
