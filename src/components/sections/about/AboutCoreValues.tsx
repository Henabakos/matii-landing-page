'use client'

import React from 'react'
import {
	Crosshair,
	Fingerprint,
	Orbit,
	Compass,
} from 'lucide-react'

export function AboutCoreValues() {
	const coreValues = [
		{
			title: 'Execution Over Everything',
			desc: 'We focus on high-impact delivery and results.',
			icon: Crosshair,
		},
		{
			title: 'Built on Trust',
			desc: 'Security, reliability, and integrity form the foundation of everything we build.',
			icon: Fingerprint,
		},
		{
			title: 'Relentless Learning',
			desc: 'We continuously adapt, innovate, and master new technologies to stay ahead.',
			icon: Orbit,
		},
		{
			title: 'Africa Rooted, World Class',
			desc: 'Our geography is our advantage; we build locally with a global standard of excellence.',
			icon: Compass,
		},
	]

	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/10 text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e] dark:text-zinc-200">
						<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
						OUR FOUNDATION
					</div>
					<h2 className="text-2xl sm:text-3xl font-urbanist font-medium text-[#292c2e] dark:text-white tracking-tight">
						Core Values
					</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{coreValues.map((value, idx) => {
					const VIcon = value.icon
					return (
						<div
							key={idx}
							className="p-6 rounded-sm bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.3)] dark:border-white/10 hover:border-[#98ff03] dark:hover:border-[#98ff03] transition-all shadow-2xs group"
						>
							<div className="w-10 h-10 rounded-sm bg-[#292c2e] dark:bg-white/10 flex items-center justify-center text-[#98ff03] mb-4 group-hover:bg-[#98ff03] group-hover:text-[#292c2e] transition-colors duration-200">
								<VIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" strokeWidth={1.75} />
							</div>
							<h3 className="text-base font-urbanist font-medium text-[#292c2e] dark:text-white mb-2">
								{value.title}
							</h3>
							<p className="text-xs font-inter text-[#797f8b] dark:text-zinc-400 leading-relaxed">
								{value.desc}
							</p>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default AboutCoreValues
