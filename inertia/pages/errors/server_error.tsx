import Layout from '~/layouts/layout'
import { Head } from '@inertiajs/react'

export default function ServerError() {
  return (
    <Layout>
      <Head title="Server Error" />
      <div>
        <h1 className="text-6xl">500 - Server Error</h1>
        <p className="mt-3 text-2xl">Cannot get Movies or Animes</p>
      </div>
    </Layout>
  )
}
