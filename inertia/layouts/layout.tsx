import React, { useEffect, useState } from 'react'
import type { PageProps } from '~/types/page_props'
import { Header, Footer } from '~/components'
import { usePage, router } from '@inertiajs/react'
import { Info } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user } = usePage<PageProps>().props
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false)

  useEffect(() => {
    if (user?.isEmailVerified === false) {
      setEmailConfirmation(true)
    } else {
      setEmailConfirmation(false)
    }
  }, [user])

  const handlerResend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.post('/resend-email')
  }

  return (
    <div className='w-screen min-h-screen flex flex-col'>
      {emailConfirmation && (
        <div className="fixed bottom-4 right-4 z-50 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-5 rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <Info className="w-5 h-5 mr-2" />
            <span>Please confirm your email address.</span>
          </div>
          <button
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 underline cursor-pointer"
            onClick={handlerResend}
          >
            Send or resend email
          </button>
        </div>
      )}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
