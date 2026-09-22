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
            className={`px-4 py-2 rounded-none text-xs font-space font-medium uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-zinc-950 text-white dark:bg-[#98ff03] dark:text-[#161819] shadow-sm border border-zinc-950 dark:border-[#98ff03]'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/80 dark:border-white/10'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
