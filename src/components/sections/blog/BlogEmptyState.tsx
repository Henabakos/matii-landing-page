type BlogEmptyStateProps = {
  searchQuery: string
  selectedCategory: string
  onReset: () => void
}

export function BlogEmptyState({
  searchQuery,
  selectedCategory,
  onReset,
}: BlogEmptyStateProps) {
  return (
    <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
      <p className="text-zinc-500 text-base font-inter">
        No articles found matching &quot;{searchQuery}&quot; in category &quot;
        {selectedCategory}&quot;.
      </p>
      <button
        onClick={onReset}
        className="mt-4 px-5 py-2.5 bg-zinc-900 text-white text-xs font-space rounded-full hover:bg-black"
      >
        Reset Filters
      </button>
    </div>
  )
}
