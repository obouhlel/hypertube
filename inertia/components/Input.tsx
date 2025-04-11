import { ChangeEvent } from 'react'

interface Input {
  id: string
  name: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
}

export function Input({ id, name, type, value, onChange, label }: Input) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-800 font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
