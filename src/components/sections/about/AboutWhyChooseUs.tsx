'use client'

import React from 'react'
import { Check } from 'lucide-react'

export function AboutWhyChooseUs() {
	const whyChooseUs = [
		'Experienced senior engineering team with zero outsourcing',
		'Modern, battle-tested technology stack (React, Node, Gemini AI)',
		'Fast MVP delivery sprints without sacrificing code cleanliness',
		'Scalable microservice & cloud database architecture',
		'Transparent, direct communication via Slack & weekly demos',
		'Long-term maintenance and guaranteed uptime support',
	]

	const industries = [
		{
			name: 'FinTech',
			icon: '💳',
			desc: 'Secure payment engines, ledger databases, compliance dashboards.',
		},
		{
			name: 'Healthcare',
			icon: '🩺',
			desc: 'Patient portals, Telehealth streaming, HIPAA compliant storage.',
		},
		{
			name: 'E-Commerce',
			icon: '🛍️',
			desc: 'High-converting storefronts, inventory sync, multi-currency checkout.',
		},
		{
			name: 'SaaS',
			icon: '🚀',
			desc: 'Multi-tenant platforms, subscription engines, real-time analytics.',
		},
		{
			name: 'Logistics',
			icon: '📦',
			desc: 'Real-time GPS tracking, dispatch portals, automated routing.',
		},
		{
			name: 'Real Estate',
			icon: '🏢',
			desc: 'Property management, interactive mapping, automated scheduling.',
		},
	]

	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
			{/* Why Choose Us */}
			<div className="lg:col-span-6 bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.4)] dark:border-white/10 rounded-2xl p-8 space-y-6 shadow-2xs transition-colors">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/10 text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e] dark:text-zinc-200">
						<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
						THE DIFFERENCE
					</div>
					<h2 className="text-2xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
						Why Choose Us
					</h2>
				</div>

				<div className="space-y-3.5">
					{whyChooseUs.map((item, i) => (
						<div key={i} className="flex items-start gap-3">
							<div className="mt-0.5 w-5 h-5 rounded-full bg-[#98ff03]/20 flex items-center justify-center shrink-0">
								<Check className="w-3.5 h-3.5 text-[#292c2e] dark:text-[#98ff03]" />
							</div>
							<span className="text-sm font-inter text-[#292c2e] dark:text-zinc-300 font-medium">
								{item}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Industries Served */}
			<div className="lg:col-span-6 bg-white dark:bg-[#161819] border border-[rgba(174,174,174,0.4)] dark:border-white/10 rounded-2xl p-8 space-y-6 shadow-2xs transition-colors">
				<div className="space-y-1">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/10 text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e] dark:text-zinc-200">
						<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
						DOMAINS
					</div>
					<h2 className="text-2xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
						Industries We Serve
					</h2>
				</div>

				<div className="grid grid-cols-2 gap-3">
					{industries.map((ind, i) => (
						<div
							key={i}
							className="p-3.5 rounded-xl bg-[#f3f4f6] dark:bg-white/5 border border-[rgba(174,174,174,0.3)] dark:border-white/10 space-y-1 transition-colors"
						>
							<div className="flex items-center gap-2">
								<span className="text-base">{ind.icon}</span>
								<span className="text-sm font-space font-semibold text-[#292c2e] dark:text-white">
									{ind.name}
								</span>
							</div>
							<p className="text-[11px] font-inter text-[#797f8b] dark:text-zinc-400 line-clamp-2">
								{ind.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AboutWhyChooseUs
