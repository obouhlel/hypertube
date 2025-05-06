import Animes, { Anime, AnimeSort } from './anime.type.js'
import axios from 'axios'
import PQueue from 'p-queue'

export class AnimeService {
  private anilistURL: string = 'https://graphql.anilist.co'
  // private nyaaURL: string = 'https://nyaaapi.onrender.com/api'
  private queryPagination: string = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(type: ANIME, isAdult: false, averageScore_greater: 80, sort: [SCORE_DESC]) {
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

  private querySearch: string = `
  query ($page: Int, $perPage: Int, $search: String, $genreIn: [String], $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, search: $search, genre_in: $genreIn, sort: $sort, isAdult: false) {
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

  async fetchAnilistPagination(page: number = 1, limit: number = 20): Promise<Animes> {
    return this.queue.add(this._fetchAnilistPagination.bind(this, page, limit)) as Promise<Animes>
  }

  private async _fetchAnilistPagination(page: number = 1, limit: number = 20): Promise<Animes> {
    try {
      const variables = {
        page,
        perPage: limit,
      }

      await this.delay(1500)
      const { data, status } = await axios.post<{
        data: { Page: Animes }
        errors?: Array<{ message: string }>
      }>(this.anilistURL, {
        query: this.queryPagination,
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
        return this._fetchAnilistPagination(page, limit)
      }
      console.error('Error fetching anime info:', error.message)
      throw new Error('Failed to fetch anime information from Anilist')
    }
  }

  async fetchAnilistSearch(
    page: number = 1,
    limit: number = 20,
    search: string | null = null,
    genres: string[] | null = null,
    sort: AnimeSort[] = ['POPULARITY']
  ): Promise<Animes> {
    return this.queue.add(
      this._fetchAnilistSearch.bind(this, page, limit, search, genres, sort)
    ) as Promise<Animes>
  }

  private async _fetchAnilistSearch(
    page: number = 1,
    limit: number = 20,
    search: string | null = null,
    genres: string[] | null = null,
    sort: AnimeSort[] = ['POPULARITY']
  ): Promise<Animes> {
    try {
      const variables = {
        page: page,
        perPage: limit,
        search: search,
        genre_in: genres,
        sort: sort,
      }

      await this.delay(1500)
      const { data, status } = await axios.post(this.anilistURL, {
        variables: variables,
        query: this.querySearch,
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
        return this._fetchAnilistPagination(page, limit)
      }
      console.error('Error fetching anime info:', error.message)
      throw new Error('Failed to fetch anime information from Anilist')
    }
  }
}
