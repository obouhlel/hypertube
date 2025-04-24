import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Button, Input, ErrorPopup } from '~/components'
import { useState, FormEvent } from 'react'
import Layout from '~/layouts/layout'

interface PageProps {
  isValid: boolean
  token: string
  [key: string]: any
}

export default function PasswordResetEmail() {
  const { isValid, token } = usePage<PageProps>().props
  const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
    token: token,
    new_password: '',
  })
  const [popupVisible, setPopupVisible] = useState(false)
  const [confrimNewPassword, setConfirmNewPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.new_password !== confrimNewPassword) {
      setError('new_password', 'Passwords do not match')
      setPopupVisible(true)
      return
    }

    post('/password-reset', {
      onSuccess: () => console.log('Password reset successful'),
      onError: () => {
        setPopupVisible(true)
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key, value)
  }

  if (!isValid) {
    return (
      <Layout>
        <Head title="Reset Password" />
        <p className="text-6xl">Your token is invalid</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head title="Reset Password" />
      <div className="flex items-center justify-center">
        {popupVisible && (
          <ErrorPopup
            errors={Object.values(errors)}
            onClose={() => {
              setPopupVisible(false)
              clearErrors()
            }}
          />
        )}
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md md:max-w-lg text-black">
          <h1 className="text-center text-6xl font-bold mb-5">Reset Your Password</h1>
          <p className="text-center text-3xl">Please enter your new password below:</p>
          <form onSubmit={handleSubmit} className="space-y-2">
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
