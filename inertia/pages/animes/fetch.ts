import type Anime from '~/types/anime.type'
import axios from 'axios'

export const fetchPagination = async (
  csrf: string,
  page: number,
  limit: number
): Promise<Anime[] | null> => {
  try {
    const { data } = await axios.post<Anime[]>(
      '/animes/pagination',
      { page, limit },
      { headers: { 'X-CSRF-TOKEN': csrf } }
    )
    console.log(data[0])
    return data
  } catch (error) {
    console.error('Error fetching animes: ', error)
    return null
  }
}
