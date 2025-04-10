import { Head, usePage, router, Link } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'

interface User {
  id: number
  name: string
  email: string
  token: string
}

interface PageProps extends InertiaPageProps {
  csrf_token: string
  user?: User
}

export default function Home() {
  const { csrf_token, user } = usePage<PageProps>().props

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    router.post(
      '/auth/logout',
      {
        _csrf: csrf_token,
      },
      {
        onSuccess: () => router.visit('/login'),
      }
    )
  }

  return (
    <>
      <Head title="Homepage" />
      <div className="container">
        <h1>Welcome {user ? user.name : 'Guest'}</h1>
        <p>Your BitTorrent-based streaming application</p>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </>
  )
}
