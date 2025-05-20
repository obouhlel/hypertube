import Layout from '~/layouts/layout'
import { useState, ChangeEvent } from 'react'
import { Head } from '@inertiajs/react'
import { Card, Loading } from '~/components'
import { useAnimeList } from '~/hooks/anime_list'
import { genres } from './genres'
import { sorts } from './sort'
import Anime from '~/types/anime.type'

interface PageProps {
  csrf: string
}

export default function AnimesList({ csrf }: PageProps) {
  const { animes, loading } = useAnimeList(csrf)

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState<string>('Title')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const getAnimeTitle = (anime: Anime): string => {
    return (
      anime.titles.find((t) => t.type === 'English')?.title ||
      anime.titles.find((t) => t.type === 'Default')?.title ||
      'No title'
    )
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    )
  }

  const filteredAnimes = animes
    .filter((anime) =>
      selectedGenres.length === 0
        ? true
        : anime.genres.some((genre) => selectedGenres.includes(genre.name))
    )
    .filter((anime) =>
      getAnimeTitle(anime).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const titleA = getAnimeTitle(a).toLowerCase()
      const titleB = getAnimeTitle(b).toLowerCase()

      switch (selectedSort) {
        case 'Title':
          return titleA.localeCompare(titleB)
        case 'Score':
          return (b.score || 0) - (a.score || 0)
        case 'Year':
          return (b.year || 0) - (a.year || 0)
        default:
          return 0
      }
    })

  return (
    <Layout>
      <Head title="Animes" />

      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-[1200px] mt-5">

          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search anime by title..."
            className="w-full px-3 py-3 mb-4 bg-black/30 border-2 border-white rounded text-white font-bold"
          />

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2 my-4">
            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre)
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-2 rounded border text-sm transition ${
                    isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-black/30 text-white border-white hover:bg-white hover:text-black'
                  }`}
                >
                  {genre}
                </button>
              )
            })}

            {selectedGenres.length > 0 && (
              <button
                onClick={() => setSelectedGenres([])}
                className="px-3 py-1 rounded border text-sm bg-red-500 text-white border-white hover:bg-red-600"
              >
                Reset Genres
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            className="w-full px-3 py-2 mb-4 border rounded bg-black/30 text-white"
            value={selectedSort}
            onChange={handleSortChange}
          >
            {sorts.map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
        </div>

        {/* Anime Cards */}
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredAnimes.map((anime) => (
            <Card
              key={anime.id}
              title={getAnimeTitle(anime)}
              year={anime.year || 2025}
              rating={anime.score || 5}
              image={anime.large_image_url}
            />
          ))}

          {!loading && filteredAnimes.length === 0 && (
            <div className="col-span-full flex justify-center items-center text-center w-full">
              No anime found
            </div>
          )}

          {loading && (
            <div className="col-span-full flex justify-center items-center w-full my-4">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
