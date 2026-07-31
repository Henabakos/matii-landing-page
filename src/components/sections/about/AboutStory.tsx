'use client'

import React from 'react'
import { CheckCircle2, Compass, Target } from 'lucide-react'

export function AboutStory() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
			{/* Story Card */}
			<div className="lg:col-span-7 bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.4)] rounded-2xl p-8 shadow-2xs flex flex-col justify-between overflow-hidden">
				<div className="space-y-4">
					<div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-2 border border-[rgba(174,174,174,0.3)] group">
						<img
							src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
							alt="Engineering Team Collaboration"
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
						<span className="absolute bottom-3 left-3 text-xs font-space font-medium text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
							Senior Engineering & Design Studio
						</span>
					</div>

					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f3f4f6] text-xs font-space font-semibold uppercase tracking-wider text-[#292c2e]">
						<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
						OUR STORY
					</div>

					<h2 className="text-2xl sm:text-3xl font-inter font-medium text-[#292c2e] dark:text-white tracking-tight">
						Founded on craftsmanship, transparency, and high technical standards.
					</h2>

					<div className="space-y-3 text-sm font-inter text-[#797f8b] dark:text-zinc-400 leading-relaxed">
						<p>
							We started in 2018 after witnessing how many businesses struggled with
							bloated software development processes, fragile legacy code, and
							communication breakdowns with external agencies.
						</p>
						<p>
							We set out to build a streamlined, senior-led engineering studio—one that
							treats every client project with the care of an internal product team.
							Over the years, we've evolved into a full-service technology partner
							helping teams implement cloud microservices, reactive frontends, and
							production AI workflows.
						</p>
					</div>
				</div>

				<div className="mt-6 pt-6 border-t border-[rgba(174,174,174,0.3)] flex items-center justify-between text-xs font-inter text-[#797f8b]">
					<span>Established 2018</span>
					<span className="flex items-center gap-1.5 font-medium text-[#292c2e] dark:text-zinc-300">
						<CheckCircle2 className="w-3.5 h-3.5 text-[#98ff03]" />
						100% Senior Engineers
					</span>
				</div>
			</div>

			{/* Mission & Vision Stack */}
			<div className="lg:col-span-5 space-y-6">
				{/* Mission */}
				<div className="bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.4)] rounded-2xl p-6 shadow-2xs space-y-3">
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-lg bg-[#f3f4f6] text-[#292c2e]">
							<Compass className="w-5 h-5 text-[#292c2e]" />
						</div>
						<h3 className="text-lg font-space font-semibold text-[#292c2e] dark:text-white">
							Our Mission
						</h3>
					</div>
					<p className="text-sm font-inter text-[#797f8b] dark:text-zinc-400 leading-relaxed">
						To help businesses turn ambitious ideas into reliable, high-performing digital
						products through modern software engineering and cutting-edge AI.
					</p>
				</div>

				{/* Vision */}
				<div className="bg-white dark:bg-zinc-950 border border-[rgba(174,174,174,0.4)] rounded-2xl p-6 shadow-2xs space-y-3">
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-lg bg-[#f3f4f6] text-[#292c2e]">
							<Target className="w-5 h-5 text-[#292c2e]" />
						</div>
						<h3 className="text-lg font-space font-semibold text-[#292c2e] dark:text-white">
							Our Vision
						</h3>
					</div>
					<p className="text-sm font-inter text-[#797f8b] dark:text-zinc-400 leading-relaxed">
						To become the most trusted technology engineering partner for growth startups
						and forward-thinking enterprises worldwide.
					</p>
				</div>
			</div>
		</div>
	)
}

export default AboutStory
