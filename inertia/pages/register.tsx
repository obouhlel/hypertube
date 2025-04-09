import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, Head, router, usePage } from '@inertiajs/react'

export default function Register() {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const { csrf_token } = usePage<{ csrf_token: string }>().props
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

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

    if (password_confirmation !== values.password) {
      setErrors({ password: ["Password doesn't match"] })
      return
    }
    router.post('/auth/register', {
      _csrf: csrf_token,
      ...preload,
    })
  }

  return (
    <>
      <Head title="Register" />
      <div className="register-container">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          {Object.keys(errors).map((key) =>
            errors[key].map((error, index) => <p key={`${key}-${index}`}>{error}</p>)
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={values.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={values.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>

          <div className="form-links">
            <Link href="/login">Already have an account? Log in</Link>
          </div>
        </form>
      </div>
    </>
  )
}
