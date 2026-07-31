'use client'

import React from 'react'

export function AboutCultureBanner() {
	return (
		<div className="relative rounded-2xl overflow-hidden border border-[rgba(174,174,174,0.4)] shadow-sm h-64 md:h-80 group">
			<img
				src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
				alt="Studio Work Culture"
				className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
			/>
			<div className="absolute inset-0 bg-gradient-to-r from-[#292c2e]/90 via-[#292c2e]/60 to-transparent flex items-center p-8 md:p-12">
				<div className="max-w-md space-y-3">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-white text-xs font-space font-semibold uppercase tracking-wider border border-white/10">
						<div className="w-2.5 h-2.5 bg-[#98ff03] rounded-xs" />
						STUDIO ATMOSPHERE
					</div>
					<h3 className="text-2xl sm:text-3xl font-inter font-medium text-white tracking-tight">
						A Culture of Deep Focus & Engineering Excellence
					</h3>
					<p className="text-xs font-inter text-zinc-300 leading-relaxed">
						Where senior engineering talent, rapid iteration, and modern AI tools
						converge to deliver extraordinary digital products.
					</p>
				</div>
			</div>
		</div>
	)
}

export default AboutCultureBanner
