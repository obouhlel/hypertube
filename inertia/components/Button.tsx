import React from 'react'
import { Link } from '@inertiajs/react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
}

export function Button({ href, className, children, ...props }: ButtonProps) {
  const baseClass = 'px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700'

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
