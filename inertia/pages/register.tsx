import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, Head, router, usePage } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

export default function Register() {
  const { csrf_token } = usePage<{ csrf_token: string }>().props
  const [values, setValues] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState<string[]>([])
  const [popupVisible, setPopupVisible] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name
    const value = e.target.value

    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { password_confirmation, ...preload } = values

    if (values.password_confirmation !== values.password) {
      setErrors(['Passwords do not match'])
      setPopupVisible(true) // Show popup
      return
    }

    router.post(
      '/auth/register',
      {
        _csrf: csrf_token,
        ...preload,
      },
      {
        onSuccess: () => {
          console.log('Register success')
          setErrors([])
          setPopupVisible(false)
        },
        onError: (errors) => {
          console.log(errors)
          setErrors(Object.values(errors))
          setPopupVisible(true)
        },
      }
    )
  }

  return (
    <Layout>
      <Head title="Register" />
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-gray-800 font-medium mb-1">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={values.first_name}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-gray-800 font-medium mb-1">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={values.last_name}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-gray-800 font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={values.password}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-gray-800 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={values.password_confirmation}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
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
