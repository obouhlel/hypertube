import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, router } from '@inertiajs/react'

interface RegisterProps {
  errors: {
    username?: string
    email?: string
    firstname?: string
    lastname?: string
    password?: string
  }
  csrfToken: string
}

export default function Register({ errors, csrfToken }: RegisterProps) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
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
    router.post('/register', values)
  }

  return (
    <>
      <div className="register-container">
        <h1>S'inscrire</h1>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_csrf" value={csrfToken} />

          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              className={errors.username ? 'is-invalid' : ''}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

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
            <label htmlFor="firstname">Prénom</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={values.firstname}
              onChange={handleChange}
              className={errors.firstname ? 'is-invalid' : ''}
            />
            {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={values.lastname}
              onChange={handleChange}
              className={errors.lastname ? 'is-invalid' : ''}
            />
            {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
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

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
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
              S'inscrire
            </button>
          </div>

          <div className="form-links">
            <Link href="/login">Déjà un compte? Se connecter</Link>
          </div>
        </form>
      </div>
    </>
  )
}
