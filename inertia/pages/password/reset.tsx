import { Button, Input, ErrorPopup } from '~/components'
import { useState, FormEvent } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/layouts/Layout'

export default function PasswordResetEmail() {
  const { data, setData, post, processing } = useForm({
    new_password: '',
    confirm_new_password: '',
  })
  const [popupVisible, setPopupVisible] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.new_password !== data.confirm_new_password) {
      setErrors(['Passwords do not match'])
      setPopupVisible(true)
      return
    }
    post('/auth/password/reset', {
      onSuccess: () => console.log('Password reset successful'),
      onError: (errors: Record<string, string>) => {
        setErrors(Object.values(errors))
        setPopupVisible(true)
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof data
    const value = e.target.value

    setData(key, value)
  }

  return (
    <Layout>
      <Head title="Reset Password" />
      <div className="container mx-auto px-4 py-8">
        {popupVisible && <ErrorPopup errors={errors} onClose={() => setPopupVisible(false)} />}
        <h1 className="text-center text-6xl font-bold mb-5">Reset Your Password</h1>
        <p className="text-center text-3xl">Please enter your new password below:</p>
        <form onSubmit={handleSubmit}>
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
            value={data.confirm_new_password}
            onChange={handleChange}
            label="Confirm Password"
          />
          <Button type="submit" disabled={processing}>
            {processing ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
        <p className="text-center mt-4">
          Remembered your password? <Link href="/auth/login">Login</Link>
        </p>
        <p className="text-center mt-2">
          Don't have an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </Layout>
  )
}
