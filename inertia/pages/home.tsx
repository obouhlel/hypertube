import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Head, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { SuccessPopup } from '~/components'
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
  message: string
}

export default function Home() {
  const { user, message } = usePage<PageProps>().props
  const [popupVisible, setPopupVisible] = useState<boolean>(!!message)

  useEffect(() => {
    if (message) {
      setPopupVisible(true)
    }
  }, [message])

  return (
    <Layout>
      <Head title="Homepage" />
      <div>
        {popupVisible && <SuccessPopup message={message} onClose={() => setPopupVisible(false)} />}
        <h1 className="text-center text-6xl font-bold mb-5">
          Welcome {user ? `${user.firstName} ${user.lastName}` : 'to Hypertube'}
        </h1>
        <p className="text-center text-3xl">Your BitTorrent-based streaming application</p>
      </div>
    </Layout>
  )
}
