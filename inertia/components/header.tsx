import type { PageProps } from '~/types/page_props'
import type { User } from '~/types/user'
import { Link, usePage, router } from '@inertiajs/react'
import { Settings, Power } from 'lucide-react'
import React, { useState } from 'react'

export function Header() {
  const props = usePage<PageProps>().props
  const user: User | undefined = props.user

  return user ? <AuthHeader user={user} /> : <GuestHeader />
}

interface AuthHeaderProps {
  user: User
}

function AuthHeader({ user }: AuthHeaderProps) {
  const [menu, setMenu] = useState<Boolean>(false)

  const handleLogout = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault()
    router.post('/auth/logout')
  }

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between border-b-2 bg-sky-900 text-white`}
    >
      <div className="flex gap-x-2 items-center h-full ml-5">
        <Link
          href="/"
          className="h-full text-2xl px-2 border-x-2 font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center h-full mr-5">
        <Settings
          className="cursor-pointer transition-transform hover:rotate-90 duration-300"
          onClick={handleMenu}
        />
        {menu && (
          <div className="absolute top-[60px] right-5 flex-col space-y-5 w-[200px] h-auto px-5 py-3 bg-sky-100 rounded text-sky-950">
            <div className="flex justify-between items-center w-full font-bold text-2xl">
              <h1 className="truncate max-w-[80%] text-lg">{user.username}</h1>
              <Power className="cursor-pointer ml-2 flex-shrink-0" onClick={handleLogout} />
            </div>
            <img
              className="rounded-full border border-sky-900 mx-auto"
              src={user.avatarUrl}
              width={100}
              height={100}
            />
            <div className="flex flex-col space-y-2 w-full">
              <Link
                className="w-full px-5 py-3 font-bold text-white text-center bg-sky-800 hover:bg-sky-700 active:bg-sky-700 rounded"
                href={'/profil/me'}
              >
                Mon profil
              </Link>
              <Link
                className="w-full px-5 py-3 font-bold text-white text-center bg-sky-800 hover:bg-sky-700 active:bg-sky-700 rounded"
                href={'/profil/edit'}
              >
                Edit profil
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function GuestHeader() {
  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 flex items-center justify-between border-b-2 bg-sky-900 text-white`}
    >
      <div className="flex gap-x-2 items-center h-full ml-5">
        <Link
          href="/"
          className="h-full text-2xl px-2 border-x-2 font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4 relative mr-5 h-full">
        <div className="flex gap-x-5 items-center h-full">
          <Link
            href="/auth/login"
            className="h-full text-2xl px-2 border-x-2 font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="h-full text-2xl px-2 border-x-2 font-bold flex items-center bg-sky-800 text-white hover:bg-sky-700 active:bg-sky-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}
