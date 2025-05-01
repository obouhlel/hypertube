import Layout from '~/layouts/layout'
import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { Card } from '~/components'
import Movies from '~/types/movies.type'

export default function MoviesList(props: { movies: Movies }) {
  useEffect(() => {
    console.log(props.movies)
  }, [props.movies])

  return (
    <Layout>
      <Head title="Movies" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {props.movies.movies.map((movie) => (
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
