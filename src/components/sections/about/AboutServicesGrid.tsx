'use client'

import React from 'react'
import { Code2, Layers, Cpu, Zap, Sparkles, Rocket } from 'lucide-react'

export function AboutServicesGrid() {
	const services = [
		{
			title: 'Custom Software Development',
			desc: 'End-to-end engineered software solutions tailored specifically to your business workflows and scale requirements.',
			tags: ['TypeScript', 'Full-stack', 'Microservices'],
			icon: Code2,
		},
		{
			title: 'Web & Cloud Applications',
			desc: 'Lightning-fast, accessible web platforms crafted with React, Next.js, and serverless edge backends.',
			tags: ['React', 'Next.js', 'Tailwind CSS'],
			icon: Layers,
		},
		{
			title: 'AI Integration & Automation',
			desc: 'Embed intelligent LLMs, custom agents, RAG workflows, and smart automation directly into your software.',
			tags: ['Gemini API', 'OpenAI', 'Python', 'LangChain'],
			icon: Cpu,
		},
		{
			title: 'Cloud Solutions & DevOps',
			desc: 'Scalable infrastructure design, automated CI/CD pipelines, containerization, and 99.99% reliability setup.',
			tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
			icon: Zap,
		},
		{
			title: 'UI/UX Design & Prototyping',
			desc: 'User-centered visual systems, interactive prototypes, and accessible design tokens built for real human use.',
			tags: ['Figma', 'Design Systems', 'User Research'],
			icon: Sparkles,
		},
		{
			title: 'Product Architecture & MVPs',
			desc: 'Rapid product strategy, proof-of-concepts, and scalable foundations designed for fast time-to-market.',
			tags: ['MVP Sprint', 'Scalable Schema', 'Postgres'],
			icon: Rocket,
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

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
