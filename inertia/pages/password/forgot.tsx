import { Button, Input, ErrorPopup } from '~/components'
import { useState, FormEvent } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

export default function PasswordResetEmail() {
  const { data, setData, post, processing } = useForm({
    email: '',
  })
  const [popupVisible, setPopupVisible] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/forgot-password', {
      onSuccess: () => console.log('Password reset link sent'),
      onError: (errors) => {
        setErrors(Object.values(errors))
        setPopupVisible(true)
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key as keyof typeof data, value)
  }

  return (
    <Layout>
      <Head title="Forgot Password" />
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg">
          {popupVisible && <ErrorPopup errors={errors} onClose={() => setPopupVisible(false)} />}
          <h1 className="text-center text-6xl font-bold mb-5 text-black">Reset Your Password</h1>
          <p className="text-center text-3xl text-black">Please enter your new email below:</p>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              label="Email"
            />
            <Button type="submit" disabled={processing}>
              {processing ? 'Sending...' : 'Send Password Reset Link'}
            </Button>
          </form>
          <p className="text-center mt-4 text-black">
            Remembered your password?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          <p className="text-center mt-2 text-black">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}
