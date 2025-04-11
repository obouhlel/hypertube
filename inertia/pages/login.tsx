import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/layouts/Layout'
import { Input, ErrorPopup, Github } from '~/components'

export default function Login() {
  const { data, setData, post, processing } = useForm({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [popupVisible, setPopupVisible] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/auth/login', {
      onSuccess: () => console.log('Login successful'),
      onError: (errors) => {
        setErrors(Object.values(errors))
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              label="Username"
            />
            <Input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              label="Password"
            />

            <div className="text-right">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                {processing ? 'Logging in...' : 'Login'}
              </button>
              <Github />
            </div>

            <div className="text-center">
              <Link href="/auth/register" className="text-blue-500 hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {popupVisible && <ErrorPopup errors={errors} onClose={() => setPopupVisible(false)} />}
    </Layout>
  )
}
