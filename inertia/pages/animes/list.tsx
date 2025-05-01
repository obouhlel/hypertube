import Layout from '~/layouts/layout'
import { Head } from '@inertiajs/react'
import { useEffect } from 'react'
import { Card } from '~/components'
import AnimeQueryResult from '~/types/anime.type'

export default function AnimesList(props: { animes: AnimeQueryResult }) {
  useEffect(() => {
    console.log(props.animes)
  }, [props.animes])

  return (
    <Layout>
      <Head title="Animes" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {props.animes.media.map((anime) => (
          <Card
            key={anime.id}
            title={anime.title.romaji}
            year={anime.startDate.year}
            rating={anime.averageScore}
            image={anime.coverImage.large}
          />
        ))}
      </div>
    </Layout>
  )
}
