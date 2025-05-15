export interface Episode {
  title: string
  seeders: number
  leechers: number
  size: string
  torrent: string
  magnet: string
}

export default interface Anime {
  mal_id: number
  titles: Array<{
    type: string
    title: string
  }>
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  genres: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  description: string
  trailer: string
  nbEpisodes: number
  episodes: Episode[]
  airing: boolean
  score: number
  year: number
}
