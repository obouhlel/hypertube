import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember_me: false as boolean,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/auth/login', {
      onSuccess: () => console.log('Login successful'),
      onError: (errors) => console.log(errors),
    })
  }

  return (
    <>
      <Head title="Login" />
      <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            {errors.email && <div>{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
            {errors.password && <div>{errors.password}</div>}
          </div>

          <div>
            <div>
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                checked={data.remember_me}
                onChange={(e) => setData('remember_me', e.target.checked)}
              />
              <label htmlFor="remember_me">Remember me</label>
            </div>

            <div>
              <a href="#">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button type="submit" disabled={processing}>
              {processing ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div>
            <Link href="/register">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </>
  )
}
