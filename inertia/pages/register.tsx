import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, Head, router, usePage } from '@inertiajs/react'
import Layout from '~/layouts/Layout'
import { Input, ErrorPopup } from '~/components'

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
      setPopupVisible(true)
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

          {popupVisible && <ErrorPopup errors={errors} onClose={() => setPopupVisible(false)} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="first_name"
              name="first_name"
              type="text"
              value={values.first_name}
              onChange={handleChange}
              label="First Name"
            />
            <Input
              id="last_name"
              name="last_name"
              type="text"
              value={values.last_name}
              onChange={handleChange}
              label="Last Name"
            />
            <Input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              label="Username"
            />
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              label="Email"
            />
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              label="Password"
            />
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={values.password_confirmation}
              onChange={handleChange}
              label="Confirm Password"
            />
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
