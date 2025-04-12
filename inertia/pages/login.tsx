import { Input, ErrorPopup, Button, SuccessPopup } from '~/components'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

export default function Login() {
  const { message } = usePage().props
  const { data, setData, post, processing } = useForm({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [popupVisible, setPopupVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (message) {
      setSuccessMessage(message as string)
      setPopupVisible(true)
    }
  }, [message])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key as keyof typeof data, value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/auth/login', {
      onSuccess: () => console.log('Login successful'),
      onError: (errors) => {
        setErrors(Object.values(errors))
        setSuccessMessage(null)
        setPopupVisible(true)
      },
    })
  }

  return (
    <Layout>
      <Head title="Login" />
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
          {popupVisible &&
            (successMessage ? (
              <SuccessPopup message={successMessage} onClose={() => setPopupVisible(false)} />
            ) : (
              <ErrorPopup errors={errors} onClose={() => setPopupVisible(false)} />
            ))}
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
                href="/github/redirect"
              >
                Login with Github
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
