import type { PagePropsUser } from '~/types/page_props'
import { Head, useForm, usePage } from '@inertiajs/react'
import { Button, Input, ErrorPopup, SuccessPopup } from '~/components'
import { useState, useEffect, FormEvent } from 'react'
import Layout from '~/layouts/layout'

interface DataForm {
  username: string
  password: string
  new_password: string
  [key: string]: string | number
}

export default function EditPassword() {
  const { user, messages } = usePage<PagePropsUser>().props
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [confrimNewPassword, setConfirmNewPassword] = useState<string>('')
  const [errorServer, setErrorServer] = useState<string | null>(null)
  const { data, setData, post, processing, errors, setError, clearErrors } = useForm<DataForm>({
    username: user.username,
    password: '',
    new_password: '',
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.new_password !== confrimNewPassword) {
      setError('new_password' as never, 'Passwords do not match')
      setPopupVisible(true)
      return
    }

    post('/profil/password', {
      onError: () => {
        setPopupVisible(true)
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key as never, value as never)
  }

  return (
    <Layout>
      <Head title="Update Password" />
      <div className="flex items-center justify-center">
        {popupVisible && messages?.success && (
          <SuccessPopup message={messages.success} onClose={() => setPopupVisible(false)} />
        )}

        {popupVisible && !messages?.success && (
          <ErrorPopup
            errors={[
              ...(errorServer ? [errorServer] : []),
              ...Object.values(errors).map((error) => String(error)),
            ]}
            onClose={() => {
              setPopupVisible(false)
              setErrorServer('')
              clearErrors()
            }}
          />
        )}
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg text-black">
          <h1 className="text-center text-6xl font-bold mb-5">Update Your Password</h1>
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              id="username"
              name="username"
              type="text"
              value={data.username}
              onChange={handleChange}
              label="Username"
            />
            <Input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
            />
            <Input
              id="new_password"
              name="new_password"
              type="password"
              value={data.new_password}
              onChange={handleChange}
              label="New Password"
            />
            <Input
              id="confirm_new_password"
              name="confirm_new_password"
              type="password"
              value={confrimNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              label="Confirm Password"
            />
            <Button type="submit" disabled={processing}>
              {processing ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
