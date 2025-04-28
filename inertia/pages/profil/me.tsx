import type { PagePropsUser } from '~/types/page_props'
import { Head, usePage } from '@inertiajs/react'
import Layout from '~/layouts/layout'
import { useEffect, useState } from 'react'
import { Loading } from '~/components'
import { capitalize } from '~/utils/capitalize'

export default function Me() {
  const { user } = usePage<PagePropsUser>().props
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    setAvatar(user.avatarUrl)
  }, [user])

  return (
    <Layout>
      <Head title={capitalize(user.username)} />
      {avatar ? (
        <div className="profile">
          <img src={avatar} alt={`${user.username}'s avatar`} loading="lazy" className="avatar" />
          <h1>{user.username}</h1>
          <p>Email: {user.email}</p>
          <p>Language: {user.language}</p>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  )
}
