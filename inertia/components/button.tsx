import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      {...props}
    >
      {children}
    </button>
  )
}
