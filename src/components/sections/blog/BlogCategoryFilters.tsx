type BlogCategoryFiltersProps = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function BlogCategoryFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: BlogCategoryFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((category) => {
        const isSelected = selectedCategory === category

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-space font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-zinc-950 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
