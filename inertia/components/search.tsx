interface SearchProps {
  searchTitle: string
  setSearchTitle: (e: string) => void
}

export function Search({ searchTitle, setSearchTitle }: SearchProps) {
  return (
    <div className="my-4 sticky top-0 z-10 w-full max-w-[1300px] bg-black/30">
      <input
        type="text"
        placeholder="Search by title ..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="border-2 border-white w-full p-4 rounded"
      />
    </div>
  )
}
