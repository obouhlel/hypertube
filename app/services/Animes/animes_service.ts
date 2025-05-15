import axios from 'axios'
import env from '#start/env'
import Anime from './anime.type.js'

export class AnimeService {
  private url = 'https://api.animetorrent.oustopie.xyz'
  private token: string | null = null

  constructor() {}

  private async _auth(): Promise<boolean> {
    if (this.token) return true
    try {
      const { data } = await axios.post<{ token: string }>(this.url + '/auth', {
        username: env.get('API_ANIME_USERNAME'),
        password: env.get('API_ANIME_PASSWORD'),
      })
      if (data?.token) {
        this.token = data.token
        return true
      }
      return false
    } catch (error) {
      console.error('Auth failed:', error)
      return false
    }
  }

  public async getAll(): Promise<Anime[]> {
    try {
      if (!this.token) await this._auth()
      const { data } = await axios.get<Anime[]>(this.url + '/animes/all', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      if (!data) {
        throw new Error('Animes not found')
      }
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async getStream(limit: number = 20, page: number = 1): Promise<Anime[] | null> {
    try {
      if (!this.token) await this._auth()
      const { data } = await axios.get<Anime[]>(this.url + '/animes/stream', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        params: {
          limit,
          page,
        },
      })
      if (!data) {
        throw new Error('Anime not found')
      }
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async getById(id: number): Promise<Anime | null> {
    try {
      if (!this.token) await this._auth()
      const { data } = await axios.get<Anime>(this.url + '/animes/' + id, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      if (!data) {
        throw new Error('Anime not found')
      }
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
