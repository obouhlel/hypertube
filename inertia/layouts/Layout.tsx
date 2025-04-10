import React from 'react'
import { Header, Footer } from '~/components'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="mt-[48px] min-h-[calc(100vh-80px)] w-screen flex justify-center items-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
