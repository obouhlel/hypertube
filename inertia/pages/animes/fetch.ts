import axios from 'axios'
import type { Animes, AnimeSort, GenreAnime } from '~/types/anime.type'

export const fetchPagination = async (
  csrf: string,
  page: number,
  limit: number
): Promise<Animes | null> => {
  try {
    const { data } = await axios.post<Animes>(
      '/animes/pagination',
      { page, limit },
      { headers: { 'X-CSRF-TOKEN': csrf } }
    )

    return data
  } catch (error) {
    console.error('Error fetching animes: ', error)
    return null
  }
}

export const fetchSearch = async (
  csrf: string,
  page: number,
  limit: number,
  search: string | null,
  genres: GenreAnime[] | null,
  sort: AnimeSort[] = ['POPULARITY']
): Promise<Animes | null> => {
  try {
    const { data } = await axios.post<Animes>(
      '/animes/search',
      {
        page,
        limit,
        search,
        genres,
        sort,
      },
      {
        headers: { 'X-CSRF-TOKEN': csrf },
      }
    )
    return data
  } catch (error) {
    console.error('Error fetching animes: ', error)
    return null
  }
}
