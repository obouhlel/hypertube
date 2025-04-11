import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, Head, useForm } from '@inertiajs/react'
import Layout from '~/layouts/Layout'
import { Input, ErrorPopup, Button } from '~/components'

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [popupVisible, setPopupVisible] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key as keyof typeof data, value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (data.password_confirmation !== data.password) {
      setPopupVisible(true)
      return
    }

    post('/auth/register', {
      onSuccess: () => {
        setPopupVisible(false)
      },
      onError: () => {
        setPopupVisible(true)
      },
    })
  }

  return (
    <Layout>
      <Head title="Register" />
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

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
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={handleChange}
              label="Confirm Password"
            />
            <div>
              <Button type="submit" disabled={processing}>
                Sign Up
              </Button>
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
