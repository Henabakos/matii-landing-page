import React from 'react'

export interface ToolCardProps {
	name: string
	category: string
	icon?: string
}

export function ToolCard({ name, category, icon }: ToolCardProps) {
	return (
		<div className="relative bg-[#f3f4f6] border border-[rgba(174,174,174,0.3)] p-4 md:p-5 flex items-center gap-4 min-w-[200px] sm:min-w-[230px] rounded-[4px] shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md cursor-pointer group">
			{/* Corner Accent Dot */}
			<div className="absolute bg-[#292c2e] size-1.5 top-0 left-0" />

			{/* Icon Badge */}
			<div className="bg-[#292c2e] size-11 shrink-0 rounded-[4px] flex items-center justify-center p-2 text-[#98ff03] font-space font-bold text-lg">
				{icon ? (
					<span>{icon}</span>
				) : (
					<div className="size-3 bg-[#98ff03] rounded-full" />
				)}
			</div>

			{/* Tool Details */}
			<div className="flex flex-col">
				<span className="font-inter font-semibold text-base text-[#292c2e] leading-snug group-hover:text-black transition-colors">
					{name}
				</span>
				<span className="font-inter font-normal text-xs text-[#797f8b]">
					{category}
				</span>
			</div>
		</div>
	)
}

export default ToolCard
