export interface Episode {
  id: number
  title: string
  seeders: number
  leechers: number
  size: string
  torrent: string
  magnet: string
}

export default interface Anime {
  id: number
  mal_id: number
  titles: Array<{
    type: string
    title: string
  }>
  genres: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  image_url: string
  small_image_url: string
  large_image_url: string
  description: string
  trailer: string
  nbEpisodes: number
  episodes: Episode[]
  airing: boolean
  score: number
  year: number
}
