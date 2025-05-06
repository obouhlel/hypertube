import type { Sort } from './sort.type'

export interface Anime {
  id: number
  title: {
    romaji: string
    english?: string
    native?: string
    userPreferred?: string
  }
  coverImage: {
    large: string
    medium: string
    extraLarge: string
    color: string
  }
  description: string
  genres: string[]
  episodes: number | null
  startDate: {
    year: number
  }
  endDate: {
    year: number
  }
  averageScore: number
}

export interface PageInfo {
  total: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
  perPage: number
}

export interface Animes {
  pageInfo: PageInfo
  media: Anime[]
}

export type AnimeSettings = {
  page: number
  limit: number
  search: string | null
  genres: GenreAnime[] | null
  sort: Sort
  sortOrder: AnimeSort[]
  hasNextPage: boolean
}

export type AnimeSort =
  | 'TITLE_ROMAJI'
  | 'TITLE_ENGLISH'
  | 'TITLE_NATIVE'
  | 'FORMAT'
  | 'START_DATE'
  | 'END_DATE'
  | 'SCORE'
  | 'POPULARITY'
  | 'TRENDING'
  | 'EPISODES'
  | 'DURATION'
  | 'STATUS'

export type GenreAnime =
  | 'Action'
  | 'Adventure'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Mystery'
  | 'Romance'
  | 'Sci-Fi'
  | 'Slice of Life'
  | 'Supernatural'
  | 'Thriller'
  | 'Seinen'
  | 'Shounen'
  | 'Shoujo'
  | 'Josei'
  | 'Mecha'
  | 'Isekai'
  | 'Sports'
  | 'Music'
  | 'Historical'
  | 'Psychological'
  | 'Ecchi'
  | 'Harem'
  | 'Parody'
  | 'Kids'
  | 'Game'
  | 'Military'
  | 'Space'
  | 'Demons'
  | 'Magic'
  | 'Vampire'
  | 'Martial Arts'
  | 'Police'
  | 'Samurai'
  | 'Post-Apocalyptic'
  | 'Cyberpunk'
  | 'School'
