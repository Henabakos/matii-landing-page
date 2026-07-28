import svgPaths from '@/lib/svgPaths'

export function ArrowForwardIcon({ color = '#292C2E' }: { color?: string }) {
	return (
		<div className="relative shrink-0 size-4 flex items-center justify-center">
			<svg className="block size-full" fill="none" height="16" viewBox="0 0 16 16" width="16">
				<path
					d={svgPaths.p159fbc80}
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.4"
				/>
			</svg>
		</div>
	)
}

export default ArrowForwardIcon
