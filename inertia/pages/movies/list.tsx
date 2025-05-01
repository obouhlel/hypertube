import Layout from '~/layouts/layout'
import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { Card } from '~/components'
import Movies, { Movie } from '~/types/movies.type'

export default function MoviesList(props: { movies: Movies }) {
  useEffect(() => {
    console.log(props.movies)
  }, [props.movies])

  return (
    <Layout>
      <Head title="Movies" />
      <div className="max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {props.movies.medias.map((movie: Movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            image={movie.large_cover_image}
          />
        ))}
      </div>
    </Layout>
  )
}
