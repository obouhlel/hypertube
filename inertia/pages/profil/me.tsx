import type { PagePropsUser } from '~/types/page_props'
import { Head, usePage } from '@inertiajs/react'
import Layout from '~/layouts/layout'
import { useEffect, useState } from 'react'
import { Loading } from '~/components'
import { capitalize } from '~/utils/capitalize'
import { User } from '~/types/user'

export default function Me() {
  const { user } = usePage<PagePropsUser>().props
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    setAvatar(user.avatarUrl)
  }, [user])

  return (
    <Layout>
      <Head title={capitalize(user.username)} />
      {avatar ? <Profil user={user} avatar={avatar} /> : <Loading />}
    </Layout>
  )
}

interface ProfilProps {
  user: User
  avatar: string
}

function Profil({ user, avatar }: ProfilProps) {
  return (
    <div className="absolute top-[48px] left-0 w-full h-44 p-5 bg-black/20 flex justify-center items-center border-b-2 border-white z-10">
      <img
        src={avatar}
        loading="lazy"
        width={100}
        height={100}
        className="rounded-full border-white border-2 mr-5 object-cover aspect-square"
      />
      <div className="space-y-2">
        <h1 className="font-bold text-3xl text-center">
          {user.firstName} {user.lastName} ({user.username})
        </h1>
        <p className="text-center text-sm mt-2 flex items-center justify-center space-x-2">
          <span>Email: {user.email}</span>
          {user.isEmailVerified ? (
            <span className="text-green-500 font-bold">✔</span>
          ) : (
            <span className="text-red-500 font-bold">✘</span>
          )}
        </p>
        <p className="text-center text-sm">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
