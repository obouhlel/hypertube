import type { PagePropsOtherUser } from '~/types/page_props'
import { Head, usePage } from '@inertiajs/react'
import Layout from '~/layouts/layout'
import { useEffect, useState } from 'react'
import { Loading } from '~/components'
import { capitalize } from '~/utils/capitalize'
import { User } from '~/types/user'

export default function UserProfil() {
  const { otherUser } = usePage<PagePropsOtherUser>().props
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    setAvatar(otherUser.avatarUrl)
  }, [otherUser])

  return (
    <Layout>
      <Head title={capitalize(otherUser.username)} />
      {avatar ? <Profil user={otherUser} avatar={avatar} /> : <Loading />}
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
        <p className="text-center text-sm">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
