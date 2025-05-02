import type { Movie } from '~/types/movies.type'
import Layout from '~/layouts/layout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Card } from '~/components'
import { fetchMovies } from './fetch'

interface PageProps {
  csrf: string
}

export default function AnimesList({ csrf }: PageProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (page === 1) {
      fetchMovies(page, csrf, setLoading, setMovies, setPage)
    }

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        setLoading(true)
        fetchMovies(page, csrf, setLoading, setMovies, setPage)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, loading])

  return (
    <Layout>
      <Head title="Movies" />
      <div className="max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title_english}
            year={movie.year}
            rating={movie.rating}
            image={movie.large_cover_image}
          />
        ))}
        {loading && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center w-full my-4">
            <div className="loadingspinner">
              <div id="square1"></div>
              <div id="square2"></div>
              <div id="square3"></div>
              <div id="square4"></div>
              <div id="square5"></div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
