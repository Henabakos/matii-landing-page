'use client'

import React from 'react'
import {
	Sparkles,
	ShieldCheck,
	MessageSquare,
	TrendingUp,
	Target,
	Zap,
} from 'lucide-react'

export function AboutCoreValues() {
	const coreValues = [
		{
			title: 'Innovation',
			desc: 'We continuously explore emerging paradigms like GenAI and modern edge architecture to solve complex problems.',
			icon: Sparkles,
		},
		{
			title: 'Quality & Craft',
			desc: 'We write clean, well-tested, maintainable code with strict type safety and high performance defaults.',
			icon: ShieldCheck,
		},
		{
			title: 'Transparency',
			desc: 'Open channels, direct communication, and clear project tracking keep you informed at every milestone.',
			icon: MessageSquare,
		},
		{
			title: 'Customer Success',
			desc: 'Your growth metrics and product uptime are our ultimate measure of technical success.',
			icon: TrendingUp,
		},
		{
			title: 'High Ownership',
			desc: 'We take full responsibility for product architecture, design details, security, and long-term scalability.',
			icon: Target,
		},
		{
			title: 'Continuous Learning',
			desc: 'Our engineering team stays ahead of technology shifts, constantly sharpening our technical stack.',
			icon: Zap,
		},
	]

	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e]">
						<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
						OUR FOUNDATION
					</div>
					<h2 className="text-2xl sm:text-3xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
						Core Values
					</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{coreValues.map((value, idx) => {
					const VIcon = value.icon
					return (
						<div
							key={idx}
							className="p-6 rounded-xl bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.3)] hover:border-[#292c2e] transition-all shadow-2xs group"
						>
							<div className="w-10 h-10 rounded-lg bg-[#292c2e] flex items-center justify-center text-[#98ff03] mb-4 group-hover:bg-[#98ff03] group-hover:text-[#292c2e] transition-colors">
								<VIcon className="w-5 h-5" />
							</div>
							<h3 className="text-base font-space font-semibold text-[#292c2e] dark:text-white mb-2">
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
