import type { PageProps } from '~/types/page_props'
import type { User } from '~/types/user'
import { Head, usePage } from '@inertiajs/react'
import Layout from '~/layouts/layout'

export default function EditProfil() {
  const props = usePage<PageProps>().props
  const user: User | undefined = props.user

  if (!user) {
    return (
      <Layout>
        <Head title="Access Denied" />
        <div className="access-denied">
          <h1>Access Denied</h1>
          <p>You need to be logged in to view this profile.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head title="Profil" />
      <div className="profile">
        <img src={user.avatarUrl} alt={`${user.username}'s avatar`} className="avatar" />
        <h1>{user.username}</h1>
        <p>Email: {user.email}</p>
        <p>Language: {user.language}</p>
      </div>
    </Layout>
  )
}
