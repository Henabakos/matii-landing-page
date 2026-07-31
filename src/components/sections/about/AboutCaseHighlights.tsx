'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

export function AboutCaseHighlights() {
	const projects = [
		{
			title: 'OmniStream Analytics Platform',
			category: 'SaaS & Big Data',
			problem:
				'Client needed to process 50,000 real-time events/sec with sub-100ms dashboard latency.',
			solution:
				'Architected event-driven microservices using Node, Redis caching, and React visualizers.',
			tech: ['React', 'Node.js', 'Redis', 'PostgreSQL', 'Tailwind'],
			results:
				'4.2x faster query speeds and $12k/mo saved in cloud infrastructure costs.',
			image:
				'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
		},
		{
			title: 'PulseHealth Patient Portal',
			category: 'Healthcare & AI',
			problem:
				'Manual patient triage took doctors an average of 45 minutes per intake session.',
			solution:
				'Built an AI-assisted intake assistant powered by Gemini API and encrypted cloud storage.',
			tech: ['Next.js', 'Gemini AI', 'TypeScript', 'Docker', 'AWS'],
			results:
				'Reduced patient intake processing time by 68% while maintaining 100% security.',
			image:
				'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
		},
	]

	return (
		<section className="space-y-6">
			<div className="space-y-1">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e]">
					<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
					CASE STUDIES
				</div>
				<h2 className="text-2xl sm:text-3xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
					Featured Case Highlights
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{projects.map((proj, i) => (
					<div
						key={i}
						className="rounded-2xl bg-white border border-[rgba(174,174,174,0.4)] overflow-hidden shadow-2xs flex flex-col justify-between"
					>
						{proj.image && (
							<div className="relative h-48 sm:h-52 overflow-hidden border-b border-[rgba(174,174,174,0.3)] group">
								<img
									src={proj.image}
									alt={proj.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
								<span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#292c2e] text-xs font-space font-semibold shadow-xs">
									{proj.category}
								</span>
							</div>
						)}

						<div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-xs font-space font-medium text-[#797f8b]">
										Case Study #0{i + 1}
									</span>
									<Sparkles className="w-4 h-4 text-[#98ff03]" />
								</div>

								<h3 className="text-xl font-space font-bold text-[#292c2e]">
									{proj.title}
								</h3>

								<div className="space-y-2 text-xs">
									<div className="p-3 rounded-lg bg-red-50/60 border border-red-100 text-red-900">
										<span className="font-semibold block mb-0.5">
											The Challenge:
										</span>
										{proj.problem}
									</div>
									<div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-emerald-900">
										<span className="font-semibold block mb-0.5">
											The Solution:
										</span>
										{proj.solution}
									</div>
								</div>
							</div>

							<div className="pt-4 border-t border-[rgba(174,174,174,0.3)] flex items-center justify-between gap-2">
								<div className="flex flex-wrap gap-1">
									{proj.tech.map((t, idx) => (
										<span
											key={idx}
											className="px-2 py-0.5 rounded text-[10px] font-space bg-[#f3f4f6] text-[#292c2e]"
										>
											{t}
										</span>
									))}
								</div>
								<span className="text-xs font-space font-bold text-[#292c2e] shrink-0">
									{proj.results.split(' ')[0]} {proj.results.split(' ')[1]}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default AboutCaseHighlights
