import Animes, { Anime, AnimeSort } from './anime.type.js'
import axios from 'axios'
import PQueue from 'p-queue'
import { Sort } from '../../types/sort.type.js'

export class AnimeService {
  private anilistURL: string = 'https://graphql.anilist.co'
  // private nyaaURL: string = 'https://nyaaapi.onrender.com/api'
  private query: string = `
  query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, search: $search, sort: $sort, isAdult: false, averageScore_greater: 70) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
          medium
          extraLarge
          color
        }
        description
        genres
        episodes
        startDate {
          year
        }
        endDate {
          year
        }
        averageScore
      }
    }
  }
  `

  private queue: PQueue

  constructor() {
    this.queue = new PQueue({ concurrency: 1, interval: 1500 })
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async fetchAnimeInfo(
    page: number = 1,
    limit: number = 20,
    search: string | null = null,
    genres: string[] | null = null,
    sort: Sort = 'asc',
    sortOrder: AnimeSort[] = ['TITLE_ENGLISH']
  ): Promise<Animes> {
    return this.queue.add(
      this._fetchAnimeInfo.bind(this, page, limit, search, genres, sort, sortOrder)
    ) as Promise<Animes>
  }

  private async _fetchAnimeInfo(
    page: number = 1,
    limit: number = 20,
    search: string | null = null,
    genres: string[] | null = null,
    sort: Sort = 'asc',
    sortOrder: AnimeSort[] = ['TITLE_ENGLISH']
  ): Promise<Animes> {
    try {
      if (sort === 'desc') {
        sortOrder[0] = (sortOrder[0] + '_' + sort.toUpperCase()) as AnimeSort
      }
      const variables = {
        page,
        perPage: limit,
        search,
        genre_in: genres,
        sort: sortOrder,
      }

      await this.delay(1500)
      const { data, status } = await axios.post<{
        data: { Page: Animes }
        errors?: Array<{ message: string }>
      }>(this.anilistURL, {
        query: this.query,
        variables,
      })

      if (data.data && data.data.Page) {
        const animes = data.data.Page
        animes.media.map((anime: Anime) => {
          anime.averageScore = anime.averageScore / 10
        })
        return animes
      } else if (status !== 200 || data.errors) {
        console.error('GraphQL errors:', data.errors)
        throw new Error('Failed to fetch animes: GraphQL errors')
      } else {
        throw new Error('Failed to fetch animes: Invalid response structure')
      }
    } catch (error) {
      if (error.response.status === 429) {
        console.warn('Too Many Requests: Retrying in 60 seconds...')
        await this.delay(60000)
        return this._fetchAnimeInfo(page, limit, search, genres, sort, sortOrder)
      }
      console.error('Error fetching anime info:', error.message)
      throw new Error('Failed to fetch anime information from Anilist')
    }
  }
}
