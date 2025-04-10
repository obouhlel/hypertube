import { Link, usePage, router } from '@inertiajs/react'
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

export function Header() {
  const { csrf_token, user } = usePage<PageProps>().props

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    router.post(
      '/auth/logout',
      {
        _csrf: csrf_token,
      },
      {
        onSuccess: () => console.log('Logout success'),
      }
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between border-b-2 bg-sky-900 text-white`}
    >
      <div className="text-2xl font-bold ml-3">Hypertube</div>
      <div className="flex gap-x-2 items-center h-full">
        <Link
          href="/"
          className="h-full text-2xl px-2 border-x font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4 relative mr-5 h-full">
        <div className="flex gap-x-5 items-center h-full">
          {user ? (
            <button
              onClick={handleLogout}
              className="h-full text-2xl px-2 border-x font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="h-full text-2xl px-2 border-x font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="h-full text-2xl px-2 border-x font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
