import type { PageProps } from '~/types/page_props'
import { useEffect, useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { SuccessPopup } from '~/components'
import Layout from '~/layouts/layout'

export default function Home() {
  const { user, messages } = usePage<PageProps>().props
  const [username, setUsername] = useState<string>('')
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
      setUsername(user.username)
    } else {
      setUsername('')
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
          Welcome {username ? username : 'to Hypertube'}
        </h1>
        <p className="text-center text-3xl">Your BitTorrent-based streaming application</p>
      </div>
    </Layout>
  )
}
