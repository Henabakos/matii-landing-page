import Image from 'next/image'

export function ImagesContainer() {
	return (
		<div className="flex items-center pointer-events-none relative shrink-0">
			<div className="-mr-2.5 relative rounded-full shrink-0 size-[26px] overflow-hidden border-2 border-white shadow-xs">
				<Image
					src="/avatars/avatar-1.png"
					alt="Client Avatar 1"
					width={26}
					height={26}
					className="object-cover size-full"
				/>
			</div>
			<div className="-mr-2.5 relative rounded-full shrink-0 size-[26px] overflow-hidden border-2 border-white shadow-xs">
				<Image
					src="/avatars/avatar-2.png"
					alt="Client Avatar 2"
					width={26}
					height={26}
					className="object-cover size-full"
				/>
			</div>
			<div className="relative rounded-full shrink-0 size-[26px] overflow-hidden border-2 border-white shadow-xs">
				<Image
					src="/avatars/avatar-3.png"
					alt="Client Avatar 3"
					width={26}
					height={26}
					className="object-cover size-full"
				/>
			</div>
		</div>
	)
}

export default ImagesContainer
