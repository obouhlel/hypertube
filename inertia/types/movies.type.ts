export default interface Movies {
  movie_count: number
  page_number: number
  limit: number
  medias: Movie[]
}

export interface Movie {
  id: number
  url: string
  imdb_code: string
  title: string
  title_english: string
  title_long: string
  slug: string
  year: number
  rating: number
  runtime: number
  genres: string[]
  summary: string
  description_full: string
  synopsis: string
  yt_trailer_code: string
  language: string
  mpa_rating: string
  background_image: string
  background_image_original: string
  small_cover_image: string
  medium_cover_image: string
  large_cover_image: string
  state: string
  torrents: Torrent[]
  date_uploaded: string
  date_uploaded_unix: number
}

export interface Torrent {
  url: string
  hash: string
  quality: string
  type: string
  is_repack: string
  video_codec: string
  bit_depth: string
  audio_channels: string
  seeds: number
  peers: number
  size: string
  size_bytes: number
  date_uploaded: string
  date_uploaded_unix: number
}

export type MovieSort =
  | 'title'
  | 'year'
  | 'rating'
  | 'peers'
  | 'seeds'
  | 'download_count'
  | 'like_count'
  | 'date_added'
