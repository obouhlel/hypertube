import type { Animes, Anime, GenreAnime, AnimeSort } from '~/types/anime.type'
import { useEffect, useState } from 'react'
import { fetchPagination, fetchSearch } from '~/pages/animes/fetch'

export const useAnimeList = (csrf: string) => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [paginationPage, setPaginationPage] = useState<number>(1)
  const [paginationHasNextPage, setPaginationHasNextPage] = useState<boolean>(true)

  const getAnimes = async () => {
    if (!paginationHasNextPage) return
    const data: Animes | null = await fetchPagination(csrf, paginationPage, 20)
    if (!data) return
    setAnimes(() => {
      const newAnimes = [
        ...animes,
        ...data.media.filter((anime) => !animes.some((existing) => existing.id === anime.id)),
      ]
      return newAnimes
    })
    setPaginationHasNextPage(data.pageInfo.hasNextPage)
    if (paginationHasNextPage) setPaginationPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (paginationPage === 1) {
      getAnimes().then(() => setLoading(false))
    }

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        paginationHasNextPage &&
        !loading
      ) {
        setLoading(true)
        getAnimes().then(() => setLoading(false))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [csrf, loading, paginationPage, paginationHasNextPage])

  // const [animesFiltered, setAnimesFiltered] = useState<Anime[]>([])
  // const [searchPage, setSearchPage] = useState<number>(1)
  // const [search, setSearch] = useState<string | null>(null)
  // const [genres, setGenres] = useState<GenreAnime[] | null>(null)
  // const [sort, setSort] = useState<AnimeSort[]>([])
  // const [searchHasNextPage, setSearchHasNextPage] = useState<boolean>(true)

  // const getAnimesSearch = async () => {
  //   if (!searchHasNextPage) {
  //     setSearchPage(1)
  //     return
  //   }
  //   const data = await fetchSearch(csrf, searchPage, 20, search, genres, sort)
  //   if (!data) return
  //   setAnimesFiltered((prev) => {
  //     const newAnimes = [
  //       ...prev,
  //       ...data.media.filter((anime) => !prev.some((existing) => existing.id === anime.id)),
  //     ]
  //     return newAnimes
  //   })
  //   setSearchHasNextPage(data.pageInfo.hasNextPage)
  //   if (searchHasNextPage) setSearchPage((prev) => prev + 1)
  // }

  // useEffect(() => {
  //   if (search || genres || sort.length > 0) {
  //     setSearchPage(1)
  //     setAnimesFiltered([])
  //     setSearchHasNextPage(true)
  //     setLoading(true)
  //     getAnimesSearch().then(() => setLoading(false))
  //   } else {
  //     setAnimesFiltered(animes)
  //   }
  // }, [search, genres, sort])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
  //       searchHasNextPage &&
  //       !loading &&
  //       (search || genres || sort.length > 0)
  //     ) {
  //       setLoading(true)
  //       getAnimesSearch().then(() => setLoading(false))
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [searchHasNextPage, loading, search, genres, sort])

  return {
    animes: animes,
    loading,
    // setSearch,
    // setGenres,
    // setSort,
  }
}
