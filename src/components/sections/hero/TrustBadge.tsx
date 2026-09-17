import ImagesContainer from './ImagesContainer'

export function TrustBadge() {
	return (
		<div className="inline-flex items-center gap-2.5 bg-white dark:bg-[#161819] border border-[#edeff3] dark:border-white/10 rounded-full px-3.5 py-1.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors">
			<ImagesContainer />
			<span className="font-inter text-sm md:text-base font-normal text-[#2a2a2b] dark:text-zinc-200 whitespace-nowrap">
				100+ Clients Globally.
			</span>
		</div>
	)
}

export default TrustBadge
