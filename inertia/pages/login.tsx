import React, { useState } from 'react'
import { Head, Link, router, usePage } from '@inertiajs/react'

export default function Login() {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const { csrf_token } = usePage<{ csrf_token: string }>().props
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name
    const value = e.target.value

    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      router.post('/auth/login', {
        _csrf: csrf_token,
        ...values,
      })
    } catch (serverErrors) {
      setErrors(serverErrors)
    }
  }

  return (
    <>
      <Head title="Login" />
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div aria-live="polite">
            {Object.entries(errors).map(([field, messages]) =>
              messages.map((message, idx) => <p key={`${field}-${idx}`}>{message}</p>)
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>

          <div>
            <Link href="/register">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </>
  )
}
