import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Head, usePage } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
}

interface PageProps extends InertiaPageProps {
  user?: User
}

export default function Home() {
  const { user } = usePage<PageProps>().props

  return (
    <Layout>
      <Head title="Homepage" />
      <div>
        <h1 className="text-center text-6xl font-bold mb-5">
          Welcome {user ? `${user.firstName} ${user.lastName}` : 'to Hypertube'}
        </h1>
        <p className="text-center text-3xl">Your BitTorrent-based streaming application</p>
      </div>
    </Layout>
  )
}
