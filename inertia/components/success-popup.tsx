import { X } from 'lucide-react'

interface SuccessPopupProps {
  message: string
  onClose: () => void
}

export function SuccessPopup({ message, onClose }: SuccessPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-green-100 p-4 rounded shadow-md w-full max-w-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-green-800 font-bold text-lg">Success</h2>
          <button
            onClick={onClose}
            className="text-green-800 hover:text-green-600 font-bold text-lg"
          >
            <X />
          </button>
        </div>
        <p className="text-green-800 mt-2">{message}</p>
      </div>
    </div>
  )
}
