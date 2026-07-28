'use client'

import ServicesTag from './services/ServicesTag'
import ServiceCard from './services/ServiceCard'

export function Services() {
	return (
		<section className="relative w-full bg-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
			<div className="max-w-[1380px] mx-auto flex flex-col items-center">
				{/* Top Tag Badge */}
				<div className="mb-6">
					<ServicesTag />
				</div>

				{/* Main Section Headline */}
				<h2 className="font-inter font-medium text-3xl sm:text-4xl md:text-[48px] leading-[1.2] text-black text-center uppercase tracking-tight mb-12 md:mb-16">
					IDEAS DON&apos;T STAY STILL.
				</h2>

				{/* Services 4-Column Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
					{/* Card 01 */}
					<ServiceCard
						index="01"
						title="DIGITAL PRODUCTS"
						description="We design and build intuitive, user-centered digital products that deliver real business impact."
						items={[
							'Product Strategy',
							'UI/UX Design',
							'SaaS Platforms',
							'MVP Development',
						]}
					/>

					{/* Card 02 */}
					<ServiceCard
						index="02"
						title="FULL-STACK DEVELOPMENT"
						description="Robust, scalable web and system engineering designed for performance, speed, and security."
						items={[
							'Frontend Development',
							'Backend Development',
							'Cloud & DevOps',
							'System Integrations',
						]}
					/>

					{/* Card 03 */}
					<ServiceCard
						index="03"
						title="AI AUTOMATION"
						description="We use intelligent technology to simplify workflows, automate repetitive tasks, and create smarter ways to work."
						items={[
							'Workflow Automation',
							'Custom AI Agents',
							'Process Optimization',
							'Smart Systems Integrations',
						]}
					/>

					{/* Card 04 */}
					<ServiceCard
						index="04"
						title="MOBILE DEVELOPMENT"
						description="High-performance iOS and Android mobile apps crafted to engage users and scale effortlessly."
						items={[
							'iOS Applications',
							'Android Applications',
							'Mobile MVPs',
							'App Maintenance & Scaling',
						]}
					/>
				</div>
			</div>
		</section>
	)
}

export default Services
