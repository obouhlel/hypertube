import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

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
            <div>
              <label htmlFor="username" className="block text-gray-800 font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-800 font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                {processing ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="text-center">
              <Link href="/auth/register" className="text-blue-500 hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 md:w-[500px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error</h2>
            <ul className="text-xl text-gray-600 space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-red-500 font-bold mr-2">•</span>
                  {error}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setPopupVisible(false)}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
