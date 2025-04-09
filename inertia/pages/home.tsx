import { Head, Link } from '@inertiajs/react'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <div className="container">
        <h1>Welcome to Hypertube</h1>
        <p>Your BitTorrent-based streaming application</p>
        <div className="auth-links">
          <Link href="/login" className="btn btn-primary">
            Log in
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Sign up
          </Link>
        </div>
      </div>
    </>
  )
}
