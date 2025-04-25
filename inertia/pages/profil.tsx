import type { PageProps } from '~/types/page_props'
import { Head, usePage } from '@inertiajs/react'
import Layout from '~/layouts/layout'

export default function Profil() {
  const { user } = usePage<PageProps>().props

  return (
    <Layout>
      <Head title="Profil" />
    </Layout>
  )
}
