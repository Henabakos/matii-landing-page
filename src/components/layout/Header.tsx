
'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export function Header() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 font-semibold text-lg md:text-xl">
						<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
							V
						</div>
						<span className="hidden sm:inline">YourBrand</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:block">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink
										href="/features"
										className="group/nmlink inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									>
										Features
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger>Products</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											<li>
												<NavigationMenuLink
													href="/products/pro"
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">Pro</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Professional plan for teams
													</p>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink
													href="/products/enterprise"
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">Enterprise</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Custom solutions for large organizations
													</p>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger>Case Studies</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											<li>
												<NavigationMenuLink
													href="/case-studies/one"
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">Study One</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Study One
													</p>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink
													href="/case-studies/two"
													className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
												>
													<div className="text-sm font-medium leading-none">Study Two</div>
													<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
														Study Two
													</p>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										href="/pricing"
										className="group/nmlink inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									>
										Pricing
									</NavigationMenuLink>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuLink
										href="/docs"
										className="group/nmlink inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
									>
										Documentation
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Desktop Contact Button */}
					<div className="hidden md:flex items-center gap-4">
						<Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
							Login
						</Link>
						<Link href="/contact" className={buttonVariants({ size: 'sm' })}>
							Contact Us
						</Link>
					</div>

					{/* Mobile Menu Toggle */}
					<button
						type="button"
						className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden pb-4">
						<nav className="flex flex-col gap-3">
							<Link
								href="/features"
								className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
								onClick={() => setIsOpen(false)}
							>
								Features
							</Link>
							<Link
								href="/products"
								className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
								onClick={() => setIsOpen(false)}
							>
								Products
							</Link>
							<Link
								href="/pricing"
								className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
								onClick={() => setIsOpen(false)}
							>
								Pricing
							</Link>
							<Link
								href="/docs"
								className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors"
								onClick={() => setIsOpen(false)}
							>
								Documentation
							</Link>
							<div className="flex flex-col gap-2 pt-2 border-t border-border">
								<Link
									href="/login"
									className={buttonVariants({
										variant: 'ghost',
										size: 'sm',
										className: 'w-full justify-start',
									})}
								>
									Login
								</Link>
								<Link
									href="/contact"
									className={buttonVariants({ size: 'sm', className: 'w-full justify-start' })}
								>
									Contact Us
								</Link>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
