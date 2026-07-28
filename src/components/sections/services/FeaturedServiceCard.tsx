import Image from 'next/image'
import svgPaths from '@/lib/svgPaths'

export interface FeaturedServiceCardProps {
	index: string
	title: string
	description: string
	items: string[]
}

export function FeaturedServiceCard({
	index,
	title,
	description,
	items,
}: FeaturedServiceCardProps) {
	return (
		<div className="relative bg-[#292c2e] border border-[rgba(174,174,174,0.2)] p-6 md:p-8 flex flex-col justify-between h-full min-h-[480px] lg:min-h-[560px] overflow-hidden group">
			{/* Background Image */}
			<Image
				src="/images/ai-automation.png"
				alt={title}
				fill
				className="object-cover size-full opacity-60"
			/>

			{/* Dark Overlay */}
			<div className="absolute inset-0 bg-black/50 pointer-events-none" />

			{/* Top Tag Badge */}
			<div className="self-center bg-[#f3f4f6] px-3 py-1.5 rounded-[2px] flex items-center gap-2.5 z-10">
				<div className="bg-[#98ff03] size-3.5 shrink-0" />
				<span className="font-space font-normal text-xs md:text-sm text-[#292c2e] uppercase tracking-wider whitespace-nowrap">
					{title}
				</span>
			</div>

			{/* Description Text */}
			<p className="font-inter font-medium text-xs md:text-[13px] text-white leading-relaxed z-10 max-w-[280px] mx-auto text-left mt-4 mb-2">
				{description}
			</p>

			{/* Center Big Number */}
			<div className="relative my-auto flex items-center justify-center pointer-events-none select-none z-10">
				<span className="font-inter font-semibold text-[140px] sm:text-[170px] lg:text-[200px] leading-none text-white/70 uppercase tracking-tighter">
					{index}
				</span>
			</div>

			{/* Action Button & Items List Container */}
			<div className="flex items-end justify-between z-10 mt-auto">
				{/* Items List with Vertical Lime Line */}
				<div className="flex items-center gap-3.5">
					<div className="w-[2px] h-[68px] bg-[#98ff03] shrink-0" />
					<ul className="font-inter font-medium text-xs md:text-[14px] text-white leading-relaxed capitalize">
						{items.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>

				{/* Arrow Action Badge */}
				<div className="bg-white p-2.5 rounded-[4px] shadow-sm flex items-center justify-center shrink-0 hover:bg-[#f3f4f6] transition-colors cursor-pointer">
					<div className="size-6 relative">
						<svg className="block size-full" fill="none" viewBox="0 0 24 24">
							<path
								clipRule="evenodd"
								d={svgPaths.p127c5100}
								fill="#292C2E"
								fillRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeaturedServiceCard
