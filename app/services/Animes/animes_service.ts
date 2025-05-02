import Animes, { AnimeSort } from './anime.type.js'
import axios from 'axios'

export class AnimeService {
  private anilistURL: string = 'https://graphql.anilist.co'
  // private nyaaURL: string = 'https://nyaaapi.onrender.com/api'
  private query: string = `
  query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: $sort, isAdult: false, averageScore_greater: 60) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        coverImage {
          large
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

  constructor() {}

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async fetchAnimeInfo(
    page: number = 1,
    limit: number = 20,
    sort: AnimeSort[] = ['TITLE_ENGLISH']
  ): Promise<Animes> {
    try {
      const variables = {
        page,
        perPage: limit,
        sort,
      }
      const response = await axios.post(this.anilistURL, {
        query: this.query,
        variables,
      })

      if (response.data && response.data.data && response.data.data.Page) {
        await this.delay(1000)
        return response.data.data.Page
      } else if (response.data && response.data.errors) {
        console.error('GraphQL errors:', response.data.errors)
        throw new Error('Failed to fetch animes: GraphQL errors')
      } else {
        throw new Error('Failed to fetch animes: Invalid response structure')
      }
    } catch (error) {
      console.error('Error fetching anime info:', error.message)
      throw new Error('Failed to fetch anime information from Anilist')
    }
  }
}
