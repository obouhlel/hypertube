import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'

interface LoginProps {
  errors: {
    email?: string
    password?: string
  }
  csrfToken: string
}

export default function Login({ errors, csrfToken }: LoginProps) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.post('/login', values)
  }

  return (
    <>
      <Head title="Login" />
      <div className="login-container">
        <h1>Se connecter</h1>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_csrf" value={csrfToken} />

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'is-invalid' : ''}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className={errors.password ? 'is-invalid' : ''}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="form-check">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={values.remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">Se souvenir de moi</label>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>

          <div className="form-links">
            <Link href="/password/reset">Mot de passe oublié?</Link>
            <Link href="/register">Pas encore de compte? S'inscrire</Link>
          </div>
        </form>
      </div>
    </>
  )
}
