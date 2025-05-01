import AnimeQueryResult, { AnimeSort } from './anime.type.js'
import axios from 'axios'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

export class AnimeService {
  private anilistURL: string = 'https://graphql.anilist.co'
  // private nyaaURL: string = 'https://nyaaapi.onrender.com/api'
  private query: string

  constructor() {
    const filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filename)
    this.query = readFileSync(path.join(dirname, 'anime_query.graphql'), 'utf-8')
  }

  async fetchAnimeInfo(
    page: number = 1,
    limit: number = 20,
    sort: AnimeSort[] = ['TITLE_ROMAJI']
  ): Promise<AnimeQueryResult> {
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
