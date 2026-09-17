'use client'

import React from 'react'
import { Code2, Layers, Cpu, Zap, Sparkles, Rocket } from 'lucide-react'

export function AboutServicesGrid() {
	const services = [
		{
			title: 'Enterprise Software',
			desc: 'Mission-critical enterprise platforms, core banking systems, and robust ERP architectures built for security, resilience, and scale.',
			tags: ['Core Banking', 'ERP Systems', 'Microservices', 'Fintech'],
			icon: Code2,
		},
		{
			title: 'BPO Solutions',
			desc: 'Tech-enabled business process outsourcing, dedicated back-office operations, and 24/7 multilingual customer support teams.',
			tags: ['Customer Experience', 'Back-Office Ops', 'Data Processing', 'Global Talent'],
			icon: Layers,
		},
		{
			title: 'AI & Data Platform',
			desc: 'Centralized data pipelines, predictive intelligence, enterprise LLM agents, and automated smart workflows.',
			tags: ['Data Pipelines', 'AI Agents', 'ETL', 'Analytics'],
			icon: Cpu,
		},
		{
			title: 'Managed Cloud Services',
			desc: 'High-availability cloud architecture, 24/7 SRE monitoring, automated CI/CD pipelines, and enterprise security compliance.',
			tags: ['Cloud Ops', '24/7 SRE', 'DevOps CI/CD', 'Security Audits'],
			icon: Zap,
		},
	]

	return (
		<section className="space-y-6">
			<div className="space-y-1">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e]">
					<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
					SERVICES & EXPERTISE
				</div>
				<h2 className="text-2xl sm:text-3xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
					What We Do
				</h2>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{services.map((service, index) => {
					const SIcon = service.icon
					return (
						<div
							key={index}
							className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.4)] flex flex-col justify-between hover:shadow-md transition-all group"
						>
							<div>
								<div className="flex items-center justify-between mb-4">
									<div className="w-12 h-12 rounded-xl bg-[#292c2e] flex items-center justify-center text-[#98ff03] group-hover:scale-105 transition-transform">
										<SIcon className="w-6 h-6" />
									</div>
									<span className="text-xs font-space text-[#797f8b]">
										0{index + 1}
									</span>
								</div>

								<h3 className="text-lg font-space font-semibold text-[#292c2e] dark:text-white mb-2">
									{service.title}
								</h3>
								<p className="text-xs font-inter text-[#797f8b] dark:text-zinc-400 leading-relaxed mb-6">
									{service.desc}
								</p>
							</div>

							<div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(174,174,174,0.3)]">
								{service.tags.map((tag, tIdx) => (
									<span
										key={tIdx}
										className="px-2 py-0.5 rounded-md text-[11px] font-space bg-[#f3f4f6] text-[#292c2e]"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default AboutServicesGrid
