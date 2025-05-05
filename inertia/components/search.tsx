import { useState } from 'react'

interface SearchProps {
  setSearch: (str: string | null) => void
}

export function Search({ setSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (str: string) => {
    setInputValue(str)
  }

  const handleSearchClick = () => {
    if (inputValue === '') {
      setSearch(null)
    } else {
      setSearch(inputValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  return (
    <div className="my-4 sticky top-0 z-10 w-full max-w-[1300px]">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Search by title ..."
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-2 border-white p-4 rounded bg-black/30 flex-grow"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-500 text-white font-bold px-5 py-4 rounded hover:bg-blue-600 transition h-full"
        >
          Search
        </button>
      </div>
    </div>
  )
}
