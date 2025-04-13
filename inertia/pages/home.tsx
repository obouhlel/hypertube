import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { useEffect, useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
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
  messages?: Record<string, string>
}

export default function Home() {
  const { user, messages } = usePage<PageProps>().props
  const [fullName, setFullName] = useState<string>('')
  const [popupVisible, setPopupVisible] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (messages?.success) {
      setMessage(messages.success)
      setPopupVisible(true)
    }
  }, [messages])

  useEffect(() => {
    if (user) {
      setFullName(`${user.firstName} ${user.lastName}`)
    }
  }, [user])

  return (
    <Layout>
      <Head title="Homepage" />
      {popupVisible && messages && message && (
        <SuccessPopup
          message={message}
          onClose={() => {
            setPopupVisible(false)
            setMessage(null)
          }}
        />
      )}
      <div>
        <h1 className="text-center text-6xl font-bold mb-5">
          Welcome {fullName ? fullName : 'to Hypertube'}
        </h1>
        <p className="text-center text-3xl">Your BitTorrent-based streaming application</p>
      </div>
    </Layout>
  )
}
