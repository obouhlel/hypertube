import type { PagePropsUser } from '~/types/page_props'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Input, ErrorPopup, SuccessPopup, Button } from '~/components'
import Layout from '~/layouts/layout'

export default function Avatar() {
  const { user, messages } = usePage<PagePropsUser>().props
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [errorServer, setErrorServer] = useState<string | null>(null)
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    avatar: null,
  })

  useEffect(() => {
    if (messages?.success) {
      setPopupVisible(true)
    }
    if (messages?.error) {
      setErrorServer(messages.error)
      setPopupVisible(true)
    }
  }, [messages])

  const handleUpdateFile = () => {}

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/profil/avatar', {
      onError: () => {
        setPopupVisible(true)
      },
    })
  }

  return (
    <Layout>
      <Head title="Avatar Update" />
      <div className="flex items-center justify-center">
        {popupVisible && messages?.success && (
          <SuccessPopup message={messages.success} onClose={() => setPopupVisible(false)} />
        )}

        {popupVisible && !messages?.success && (
          <ErrorPopup
            errors={[...(errorServer ? [errorServer] : []), ...Object.values(errors)]}
            onClose={() => {
              setPopupVisible(false)
              setErrorServer('')
              clearErrors()
            }}
          />
        )}
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit profil</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <Button type="submit" disabled={processing}>
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
