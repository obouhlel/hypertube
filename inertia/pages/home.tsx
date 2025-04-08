import { Head, Link } from '@inertiajs/react'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <div className="container">
        <h1>Bienvenue sur Hypertube</h1>
        <p>Votre application de streaming basée sur BitTorrent</p>
        <div className="auth-links">
          <Link href="/login" className="btn btn-primary">
            Se connecter
          </Link>
          <Link href="/register" className="btn btn-secondary">
            S'inscrire
          </Link>
        </div>
      </div>
    </>
  )
}
