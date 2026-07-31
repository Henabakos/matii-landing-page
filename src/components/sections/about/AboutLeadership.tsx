'use client'

import React from 'react'

export function AboutLeadership() {
	const teamMembers = [
		{
			name: 'Alex Rivera',
			role: 'Founder & Chief Architect',
			expertise: 'Full-Stack Systems, Distributed AI',
			bio: '10+ years building high-throughput cloud applications and leading engineering teams.',
			initials: 'AR',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
		},
		{
			name: 'Elena Rostova',
			role: 'Head of Product Design',
			expertise: 'Design Systems, Micro-interactions',
			bio: 'Crafted award-winning SaaS interfaces used by over 2M active monthly users.',
			initials: 'ER',
			avatar:
				'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
		},
		{
			name: 'Marcus Chen',
			role: 'Lead AI Engineer',
			expertise: 'LLM Fine-tuning, RAG, PyTorch',
			bio: 'Specialist in bridging state-of-the-art AI research models into responsive production APIs.',
			initials: 'MC',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
		},
	]

	return (
		<section className="space-y-6">
			<div className="space-y-1">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e]">
					<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
					ENGINEERING TEAM
				</div>
				<h2 className="text-2xl sm:text-3xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
					Meet Our Leadership
				</h2>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{teamMembers.map((member, i) => (
					<div
						key={i}
						className="p-6 rounded-2xl bg-white border border-[rgba(174,174,174,0.4)] space-y-4 shadow-2xs"
					>
						<div className="flex items-center gap-4">
							<div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#292c2e] text-[#98ff03] font-space font-bold flex items-center justify-center text-sm shadow-2xs shrink-0 border border-[rgba(174,174,174,0.3)]">
								{member.avatar ? (
									<img
										src={member.avatar}
										alt={member.name}
										className="w-full h-full object-cover"
									/>
								) : (
									member.initials
								)}
							</div>
							<div>
								<h3 className="text-base font-space font-bold text-[#292c2e]">
									{member.name}
								</h3>
								<p className="text-xs font-inter font-medium text-[#797f8b]">
									{member.role}
								</p>
							</div>
						</div>

						<p className="text-xs font-inter text-[#797f8b] leading-relaxed">
							{member.bio}
						</p>

						<div className="pt-3 border-t border-[rgba(174,174,174,0.3)]">
							<span className="text-[10px] uppercase font-space font-semibold text-[#797f8b]">
								Expertise
							</span>
							<p className="text-xs font-inter font-medium text-[#292c2e]">
								{member.expertise}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default AboutLeadership
