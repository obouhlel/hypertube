import type { PagePropsUser } from '~/types/page_props'
import { Head, useForm, usePage } from '@inertiajs/react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { ErrorPopup, SuccessPopup, Button } from '~/components'
import Layout from '~/layouts/layout'

export default function Avatar() {
  const { user, messages } = usePage<PagePropsUser>().props
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [errorServer, setErrorServer] = useState<string | null>(null)
  const { data, setData, post, processing, errors, clearErrors } = useForm<{ avatar: File | null }>(
    {
      avatar: null,
    }
  )
  const [avatarUrl, setAvatarUrl] = useState<string>('https://ui-avatars.com/api/')

  useEffect(() => {
    if (messages?.success) {
      setPopupVisible(true)
    }
    if (messages?.error) {
      setErrorServer(messages.error)
      setPopupVisible(true)
    }
  }, [messages])

  useEffect(() => {
    setAvatarUrl(user.avatarUrl)
  }, [user])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (data.avatar === null) return

    post('/profil/avatar', {
      onSuccess: () => {
        setData('avatar', null)
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      },
      onError: () => {
        setPopupVisible(true)
      },
      forceFormData: true,
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit avatar</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col items-center mb-4 space-y-2">
                <img
                  src={avatarUrl}
                  alt="Current avatar"
                  loading="lazy"
                  className="w-24 h-24 rounded-full mb-5 object-cover"
                />
                <input
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setData('avatar', e.target.files[0])
                    }
                  }}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
                {errors.avatar && <p className="mt-1 text-xs text-red-500">{errors.avatar}</p>}
              </div>
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
