import { Head } from '@inertiajs/react'
import Layout from '~/layouts/layout'

export default function NotFound() {
  return (
    <Layout>
      <Head title="Not Found" />
      <h1 className="text-6xl">404 - Page Not Found</h1>
    </Layout>
  )
}
