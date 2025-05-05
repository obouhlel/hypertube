import axios from 'axios'
import type { Animes, AnimeSort } from '~/types/anime.type'
import { Sort } from '~/types/sort.type'

export const fetchAnimes = async (
  csrf: string,
  page: number,
  limit: number,
  search: string | null,
  genres: string[] | null,
  sort: Sort,
  sortOrder: AnimeSort[]
): Promise<Animes | null> => {
  try {
    const { data } = await axios.post<Animes>(
      '/animes/pagination',
      { page, limit, search, genres, sort, sortOrder },
      { headers: { 'X-CSRF-TOKEN': csrf } }
    )

    return data
  } catch (error) {
    console.error('Error fetching animes:', error)
    return null
  }
}
