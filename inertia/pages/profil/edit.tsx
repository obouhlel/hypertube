import type { PageProps } from '~/types/page_props'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Input, ErrorPopup, SuccessPopup, Button } from '~/components'
import Layout from '~/layouts/layout'

export default function EditProfil() {
  const { user, messages } = usePage<PageProps>().props
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    username: user!.username,
    first_name: user!.firstName,
    last_name: user!.lastName,
    email: user!.email,
    language: user!.language
  })
  const [popupVisible, setPopupVisible] = useState(false)
  const [errorServer, setErrorServer] = useState<string | null>(null)

  useEffect(() => {
    console.log(messages)
    if (messages?.success) {
      setPopupVisible(true)
    }
    if (messages?.error) {
      setErrorServer(messages.error)
      setPopupVisible(true)
    }
  }, [messages])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key as keyof typeof data, value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post('/profil/update', {
      onSuccess: () => console.log('Edit profil successful'),
      onError: () => {
        setPopupVisible(true)
      },
    })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

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
      <Head title="Register" />
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
            <Input
              id="first_name"
              name="first_name"
              type="text"
              value={data.first_name}
              onChange={handleChange}
              label="First Name"
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              value={data.last_name}
              onChange={handleChange}
              label="Last Name"
            />
            <Input
              id="username"
              name="username"
              type="text"
              value={data.username}
              onChange={handleChange}
              label="Username"
            />
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              label="Email"
            />
            <div>
              <label htmlFor="language" className="block text-gray-800 font-medium mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={data.language}
                onChange={(e) => setData('language', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" disabled={processing}>
                Update
              </Button>
              <Link href="/update-password" className="text-blue-500 hover:underline">
                Change password
              </Link>
              <Link href="/update-avatar" className="text-blue-500 hover:underline">
                Change avatar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
