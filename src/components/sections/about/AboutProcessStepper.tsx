'use client'

import React, { useState } from 'react'
import { Workflow } from 'lucide-react'

export function AboutProcessStepper() {
	const [activeProcessStep, setActiveProcessStep] = useState<number>(0)

	const processSteps = [
		{
			step: '01',
			title: 'Discovery',
			desc: 'We map out product requirements, target audience expectations, business logic, and key technical risks.',
			deliverable: 'Technical Roadmap & Scope',
		},
		{
			step: '02',
			title: 'Planning',
			desc: 'Designing data schemas, architectural diagrams, API contracts, and sprint breakdown schedules.',
			deliverable: 'System Specs & Wireframes',
		},
		{
			step: '03',
			title: 'Design',
			desc: 'Crafting responsive UI components, interactive prototypes, and accessible design systems in Figma.',
			deliverable: 'Interactive High-Fi Mockups',
		},
		{
			step: '04',
			title: 'Development',
			desc: 'Surgical execution using TypeScript, modular React components, clean API routing, and cloud databases.',
			deliverable: 'Production-ready Codebase',
		},
		{
			step: '05',
			title: 'Testing',
			desc: 'Comprehensive unit, integration, security audit, and performance testing under heavy load simulations.',
			deliverable: 'QA & Security Greenlit',
		},
		{
			step: '06',
			title: 'Deployment',
			desc: 'Seamless zero-downtime release to Cloud Run / Vercel with automated monitoring and alerting.',
			deliverable: 'Live Production Release',
		},
		{
			step: '07',
			title: 'Maintenance',
			desc: 'Proactive server monitoring, dependency updates, analytics tracking, and continuous feature expansion.',
			deliverable: '24/7 SLA & Growth Support',
		},
	]

	return (
		<section className="bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.4)] rounded-2xl p-8 shadow-2xs space-y-8">
			<div className="space-y-1">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e]">
					<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
					WORKFLOW
				</div>
				<h2 className="text-2xl sm:text-3xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
					Our Development Process
				</h2>
				<p className="text-xs font-inter text-[#797f8b]">
					Click through our 7-step engineering framework to see how we deliver products.
				</p>
			</div>

			{/* Stepper Tabs */}
			<div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[rgba(174,174,174,0.3)]">
				{processSteps.map((s, idx) => (
					<button
						key={idx}
						onClick={() => setActiveProcessStep(idx)}
						className={`flex items-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-space font-semibold whitespace-nowrap transition-all cursor-pointer ${
							activeProcessStep === idx
								? 'bg-[#292c2e] text-white shadow-2xs'
								: 'bg-[#f3f4f6] hover:bg-zinc-200 text-[#292c2e]'
						}`}
					>
						<span className="font-space text-[10px] text-[#98ff03]">{s.step}</span>
						<span>{s.title}</span>
					</button>
				))}
			</div>

			{/* Active Step Content */}
			<div className="p-6 rounded-xl bg-[#f3f4f6] border border-[rgba(174,174,174,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
				<div className="space-y-2 max-w-2xl">
					<div className="flex items-center gap-3">
						<span className="px-2.5 py-1 rounded-md bg-[#98ff03] text-black font-space font-bold text-xs">
							STEP {processSteps[activeProcessStep].step}
						</span>
						<h3 className="text-xl font-space font-bold text-[#292c2e]">
							{processSteps[activeProcessStep].title} Phase
						</h3>
					</div>
					<p className="text-sm font-inter text-[#797f8b] leading-relaxed">
						{processSteps[activeProcessStep].desc}
					</p>
				</div>

				<div className="p-4 rounded-lg bg-white border border-[rgba(174,174,174,0.3)] shrink-0 w-full md:w-auto">
					<span className="text-[10px] font-space font-semibold uppercase tracking-wider text-[#797f8b] block mb-1">
						Primary Deliverable
					</span>
					<span className="text-xs font-inter font-semibold text-[#292c2e] flex items-center gap-2">
						<Workflow className="w-3.5 h-3.5 text-[#98ff03]" />
						{processSteps[activeProcessStep].deliverable}
					</span>
				</div>
			</div>
		</section>
	)
}

export default AboutProcessStepper
