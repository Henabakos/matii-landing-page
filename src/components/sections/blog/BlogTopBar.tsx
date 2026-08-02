import { Search, X } from 'lucide-react'

type BlogTopBarProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
}

export function BlogTopBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
}: BlogTopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6">
      <div>
        <h1 className="font-space font-bold text-2xl sm:text-3xl text-zinc-950 tracking-tight mt-0.5">
          Blogs
        </h1>
      </div>

      {/* <div className="relative w-full sm:w-[340px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search blogs..."
          className="w-full bg-[#f3f4f6] text-zinc-900 placeholder-zinc-500 text-sm pl-5 pr-10 py-3 rounded-full border border-zinc-200/80 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all shadow-inner"
        />
        {searchQuery ? (
          <button
            onClick={onClearSearch}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        ) : (
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
        )}
      </div> */}
    </div>
  )
}
