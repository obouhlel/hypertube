interface ErrorPopupProps {
  errors: string[]
  onClose: () => void
}

export function ErrorPopup({ errors, onClose }: ErrorPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 md:w-[500px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Error</h2>
        <ul className="text-xl text-gray-600 space-y-2">
          {errors.map((error, index) => (
            <li key={index} className="flex items-center">
              <span className="text-red-500 font-bold mr-2">•</span>
              {error}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  )
}
