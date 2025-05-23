import Animes, { Anime, AnimeSort } from './anime.type.js'
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
      media(type: ANIME, sort: $sort, isAdult: false, averageScore_greater: 70) {
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

      const { data, status } = await axios.post<{
        data: { Page: Animes }
        errors?: Array<{ message: string }>
      }>(this.anilistURL, {
        query: this.query,
        variables,
      })

      if (data.data && data.data.Page) {
        await this.delay(2500)
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
      console.error('Error fetching anime info:', error.message)
      throw new Error('Failed to fetch anime information from Anilist')
    }
  }
}
