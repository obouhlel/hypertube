import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Input, ErrorPopup, SuccessPopup, Button } from '~/components'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

interface PageProps extends InertiaPageProps {
  messages?: Record<string, string>
}

export default function Login() {
  const { messages } = usePage<PageProps>().props
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    username: '',
    password: '',
  })
  const [popupVisible, setPopupVisible] = useState(false)
  const [errorServer, setErrorServer] = useState<string | null>(null)

  useEffect(() => {
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
    post('/auth/login', {
      onSuccess: () => console.log('Login successful'),
      onError: () => {
        setPopupVisible(true)
      },
    })
  }

  return (
    <Layout>
      <Head title="Login" />
      <div className="flex items-center justify-center">
        {popupVisible && messages?.success && (
          <SuccessPopup
            message={messages.success}
            onClose={() => {
              setPopupVisible(false)
            }}
          />
        )}

        {popupVisible && !messages?.success && (
          <ErrorPopup
            errors={[...(errorServer ? [errorServer] : []), ...Object.values(errors)]}
            onClose={() => {
              setPopupVisible(false)
              setErrorServer(null)
              clearErrors()
            }}
          />
        )}
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="text-right">
              <Link href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot your password?
              </Link>
            </div>

            <div className="flex flex-col space-y-4">
              <Button type="submit" disabled={processing}>
                {processing ? 'Logging in...' : 'Login'}
              </Button>
              <a
                className="w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                href="/google/redirect"
              >
                Login with Google
              </a>
              <a
                className="w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                href="/github/redirect"
              >
                Login with Github
              </a>
              <a
                className="w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                href="/discord/redirect"
              >
                Login with Discord
              </a>
              <a
                className="w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                href="/fortytwo/redirect"
              >
                Login with Forty Two
              </a>
            </div>

            <div className="text-center">
              <Link href="/auth/register" className="text-blue-500 hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
