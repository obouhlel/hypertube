import { useState } from 'react'
// import { useAnimeList } from '~/hooks/anime_list'
import { genresAnime } from '~/pages/animes/genres'
import { AnimeSort, GenreAnime } from '~/types/anime.type'

interface SearchAnimeProps {
  csrf: string
}

export function SearchAnimes({ csrf }: SearchAnimeProps) {
  // const { setSearch, setGenres, setSort } = useAnimeList(csrf)
  const [search, setSearchInput] = useState<string>('')
  const [genre, setGenreInput] = useState<GenreAnime[]>([])
  const [sort, setSortInput] = useState<AnimeSort>('POPULARITY')

  const handleSubmit = () => {
    // setSearch(search.trim() === '' ? null : search.trim())
    // setGenres(genre.length === 0 ? null : genre)
    // setSort(sort ? [sort] : ['POPULARITY'])
  }

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value as GenreAnime
    )
    setGenreInput(selectedOptions)
  }

  return (
    <div className="my-4 sticky top-0 z-10 w-full max-w-[1300px]">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          name="search"
          type="text"
          placeholder="Search by title ..."
          className="border-2 border-white p-4 rounded bg-black/30 flex-grow"
          value={search}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          name="genre"
          multiple
          className="border-2 border-white p-4 rounded bg-black/30"
          value={genre}
          onChange={handleGenreChange}
          size={5}
        >
          {genresAnime.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          name="sort"
          className="border-2 border-white p-4 rounded bg-black/30"
          value={sort}
          onChange={(e) => setSortInput(e.target.value as AnimeSort)}
        >
          <option value="">Sort By</option>
          <option value="TITLE_ENGLISH">Title (A-Z)</option>
          <option value="TITLE_ENGLISH_DESC">Title (Z-A)</option>
          <option value="SCORE_DESC">Score (High to Low)</option>
          <option value="SCORE">Score (Low to High)</option>
        </select>
        <button
          className="bg-blue-500 text-white font-bold px-5 py-4 rounded hover:bg-blue-600 transition h-full"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  )
}
