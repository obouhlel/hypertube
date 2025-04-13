import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Link, Head, useForm, usePage } from '@inertiajs/react'
import { Input, ErrorPopup, Button } from '~/components'
import Layout from '~/layouts/Layout'

export default function Register() {
  const { messages } = usePage().props
  const { data, setData, post, processing } = useForm({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [popupVisible, setPopupVisible] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (messages) {
      setErrors(messages as string[])
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

    if (confirmPassword !== data.password) {
      setPopupVisible(true)
      return
    }

    post('/auth/register', {
      onSuccess: () => console.log('Registration successful'),
      onError: () => {
        setErrors(Object.values(errors))
        setPopupVisible(true)
      },
    })
  }

  return (
    <Layout>
      <Head title="Register" />
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign up</h1>

          {popupVisible && (
            <ErrorPopup errors={Object.values(errors)} onClose={() => setPopupVisible(false)} />
          )}

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
            <Input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
            />
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
            />
            <div className="flex flex-col space-y-4">
              <Button type="submit" disabled={processing}>
                Sign up
              </Button>
              <a
                className="w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                href="/github/redirect"
              >
                Sign up with Github
              </a>
              <a
                className="w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                href="/fortytwo/redirect"
              >
                Sign up with Forty Two
              </a>
            </div>

            <div className="text-center">
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
