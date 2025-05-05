import Layout from '~/layouts/layout'
import { Head } from '@inertiajs/react'
import { Card, Loading } from '~/components'
import { useAnimeList } from '~/hooks/anime_list'

interface PageProps {
  csrf: string
}

export default function AnimesList({ csrf }: PageProps) {
  const { animes, loading } = useAnimeList(csrf)

  return (
    <Layout>
      <Head title="Animes" />
      <div className="max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {animes.map((anime) => (
          <Card
            key={anime.id}
            title={anime.title.english ? anime.title.english : anime.title.romaji}
            year={anime.startDate.year}
            rating={anime.averageScore}
            image={anime.coverImage.extraLarge}
          />
        ))}
        {loading && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center w-full my-4">
            <Loading />
          </div>
        )}
      </div>
    </Layout>
  )
}
