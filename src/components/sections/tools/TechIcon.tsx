import React from 'react'

interface TechIconProps {
	name: string
	className?: string
	color?: string
}

export const TechIcon: React.FC<TechIconProps> = ({
	name,
	className = 'w-6 h-6',
	color,
}) => {
	const iconKey = name.toLowerCase().replace(/[^a-z0-9]/g, '')

	switch (iconKey) {
		case 'react':
		case 'reactjs':
			return (
				<svg
					viewBox="0 0 24 24"
					fill="none"
					className={className}
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<ellipse
						cx="12"
						cy="12"
						rx="10"
						ry="4.5"
						transform="rotate(0 12 12)"
						stroke="#61DAFB"
						fill="none"
					/>
					<ellipse
						cx="12"
						cy="12"
						rx="10"
						ry="4.5"
						transform="rotate(60 12 12)"
						stroke="#61DAFB"
						fill="none"
					/>
					<ellipse
						cx="12"
						cy="12"
						rx="10"
						ry="4.5"
						transform="rotate(120 12 12)"
						stroke="#61DAFB"
						fill="none"
					/>
					<circle cx="12" cy="12" r="2" fill="#61DAFB" />
				</svg>
			)

		case 'typescript':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<rect width="24" height="24" rx="4" fill="#3178C6" />
					<path
						d="M11.5 16.5C11.5 18 10 18.5 8.5 18.5C6.5 18.5 5.5 17.2 5.5 15.5"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M5.5 11.5H11.5"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M8.5 11.5V18"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M18.5 12.5C17.5 11.8 16 11.5 14.5 12C13.5 12.4 13 13.2 13 14.2C13 15.8 14.5 16.2 16 16.5C17.5 16.8 18.5 17.2 18.5 18.5C18.5 20 16.8 20.5 15 20"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			)

		case 'nextjs':
		case 'next':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<circle cx="12" cy="12" r="10" fill="#000000" />
					<path
						d="M14.5 9.5L9 16.5V9.5"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M15 9.5V16.5"
						stroke="white"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			)

		case 'tailwindcss':
		case 'tailwind':
		case 'tw':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M12 6C9.333 6 7.667 7.333 7 10C8 8.667 9.333 8.333 11 9C12.143 9.457 12.958 10.286 13.867 11.211C15.35 12.72 17.065 14.467 21 14.467C23.667 14.467 25.333 13.133 26 10.467C25 11.8 23.667 12.133 22 11.467C20.857 11.01 20.042 10.18 19.133 9.256C17.65 7.747 15.935 6 12 6Z"
						fill="#38BDF8"
						transform="scale(0.8) translate(-2, -1)"
					/>
				</svg>
			)

		case 'nodejs':
		case 'node':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#5FA04E" />
					<path d="M12 6L17 9V15L12 18L7 15V9L12 6Z" fill="#333333" />
				</svg>
			)

		case 'python':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M11.8 2C6.8 2 7 4.1 7 4.1V6.2H12.2V7H5.2C3.1 7 1.5 8.5 1.5 11.1C1.5 13.7 3 15 5.1 15H6.6V13.2C6.6 11 8.4 9.2 10.6 9.2H15.8C17.6 9.2 19 7.8 19 6C19 4.2 17.2 2 11.8 2Z"
						fill="#3776AB"
					/>
					<path
						d="M12.2 22C17.2 22 17 19.9 17 19.9V17.8H11.8V17H18.8C20.9 17 22.5 15.5 22.5 12.9C22.5 10.3 21 9 18.9 9H17.4V10.8C17.4 13 15.6 14.8 13.4 14.8H8.2C6.4 14.8 5 16.2 5 18C5 19.8 6.8 22 12.2 22Z"
						fill="#FFE873"
					/>
					<circle cx="9" cy="4.5" r="1" fill="white" />
					<circle cx="15" cy="19.5" r="1" fill="#3776AB" />
				</svg>
			)

		case 'figma':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M8 24C10.2 24 12 22.2 12 20V16H8C5.8 16 4 17.8 4 20C4 22.2 5.8 24 8 24Z"
						fill="#0ACF83"
					/>
					<path
						d="M4 12C4 9.8 5.8 8 8 8H12V16H8C5.8 16 4 14.2 4 12Z"
						fill="#A259FF"
					/>
					<path
						d="M4 4C4 1.8 5.8 0 8 0H12V8H8C5.8 8 4 6.2 4 4Z"
						fill="#F24E1E"
					/>
					<path
						d="M12 0H16C18.2 0 20 1.8 20 4C20 6.2 18.2 8 16 8H12V0Z"
						fill="#FF7262"
					/>
					<path
						d="M20 12C20 14.2 18.2 16 16 16C13.8 16 12 14.2 12 12C12 9.8 13.8 8 16 8C18.2 8 20 9.8 20 12Z"
						fill="#1ABCFE"
					/>
				</svg>
			)

		case 'postgresql':
		case 'postgres':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 16.5V14H8V11H11V8.5L16 12.5L11 16.5Z"
						fill="#336791"
					/>
				</svg>
			)

		case 'docker':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M13.98 11.08h2.12v2.12h-2.12zM10.74 11.08h2.12v2.12h-2.12zM7.5 11.08h2.12v2.12H7.5zM4.26 11.08h2.12v2.12H4.26zM10.74 7.84h2.12v2.12h-2.12zM7.5 7.84h2.12v2.12H7.5zM13.98 7.84h2.12v2.12h-2.12zM7.5 4.6h2.12v2.12H7.5z"
						fill="#2496ED"
					/>
					<path
						d="M22.5 12.2c-.4-.3-1.4-.4-2.2 0-.2-.6-.7-1.1-1.3-1.3-.2-.1-.5-.1-.7-.1-.8 0-1.5.4-1.9 1.1h-12.8c-.5 0-.9.2-1.2.5-.5.6-.7 1.4-.6 2.2.6 3.8 4.2 6.6 8.3 6.6 5 0 9.2-3.2 9.8-7.8.8.1 1.7-.2 2.6-1.2z"
						fill="#2496ED"
					/>
				</svg>
			)

		case 'aws':
		case 'awscloud':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M6.8 13.2C6 13.2 5.3 12.8 5 12.1L3.8 13.3C4.5 14.3 5.5 14.8 6.9 14.8C8.9 14.8 10.1 13.6 10.1 11.8V7.5H8.6V11.8C8.6 12.7 8 13.2 6.8 13.2Z"
						fill="#FF9900"
					/>
					<path
						d="M12.5 14.8C14.5 14.8 15.8 13.5 15.8 11.6V7.5H14.3V11.5C14.3 12.5 13.6 13.2 12.5 13.2C11.4 13.2 10.7 12.5 10.7 11.5V7.5H9.2V11.6C9.2 13.5 10.5 14.8 12.5 14.8Z"
						fill="#FF9900"
					/>
					<path
						d="M2.5 18C8.5 21.5 15.5 21.5 21.5 18"
						stroke="#FF9900"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M19.5 16.5L22 18.5L19 20"
						stroke="#FF9900"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			)

		case 'graphql':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z"
						stroke="#E10098"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
					<circle cx="12" cy="2" r="2" fill="#E10098" />
					<circle cx="20.66" cy="7" r="2" fill="#E10098" />
					<circle cx="20.66" cy="17" r="2" fill="#E10098" />
					<circle cx="12" cy="22" r="2" fill="#E10098" />
					<circle cx="3.34" cy="17" r="2" fill="#E10098" />
					<circle cx="3.34" cy="7" r="2" fill="#E10098" />
					<path
						d="M12 6L18 16H6L12 6Z"
						fill="#E10098"
						fillOpacity="0.3"
						stroke="#E10098"
						strokeWidth="1.5"
					/>
				</svg>
			)

		case 'gemini':
		case 'googlegemini':
		case 'geminiai':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
						fill="url(#geminiGrad)"
					/>
					<defs>
						<linearGradient
							id="geminiGrad"
							x1="0"
							y1="0"
							x2="24"
							y2="24"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#1BA0F2" />
							<stop offset="0.5" stopColor="#A855F7" />
							<stop offset="1" stopColor="#EC4899" />
						</linearGradient>
					</defs>
				</svg>
			)

		case 'openai':
		case 'openaiapi':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M22.2 10.7a5.8 5.8 0 0 0-.5-4.8 5.9 5.9 0 0 0-5.7-2.9 5.9 5.9 0 0 0-4.6-2.1 5.9 5.9 0 0 0-5.6 3.9 5.9 5.9 0 0 0-4.2 3A5.8 5.8 0 0 0 2.8 13a5.9 5.9 0 0 0 .5 4.8 5.9 5.9 0 0 0 5.7 2.9 5.9 5.9 0 0 0 4.6 2.1 5.9 5.9 0 0 0 5.6-3.9 5.9 5.9 0 0 0 4.2-3 5.8 5.8 0 0 0-1.2-5.2zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
						fill="#10A37F"
					/>
				</svg>
			)

		case 'redis':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path d="M3 7L12 3L21 7V17L12 21L3 17V7Z" fill="#DC382D" opacity="0.8" />
					<path d="M12 3V21" stroke="white" strokeWidth="1" opacity="0.4" />
					<path d="M3 7L21 17" stroke="white" strokeWidth="1" opacity="0.4" />
					<path d="M21 7L3 17" stroke="white" strokeWidth="1" opacity="0.4" />
				</svg>
			)

		case 'vue':
		case 'vuejs':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path d="M2 3H6.5L12 12.5L17.5 3H22L12 20.5L2 3Z" fill="#41B883" />
					<path d="M6.5 3H10L12 6.5L14 3H17.5L12 12.5L6.5 3Z" fill="#35495E" />
				</svg>
			)

		case 'vite':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M21.5 3.5L12.5 22L2.5 4.5L12 2L21.5 3.5Z"
						fill="url(#viteGrad1)"
					/>
					<path
						d="M16 3L12 11.5L9 8L4 18"
						stroke="#FFD000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<defs>
						<linearGradient
							id="viteGrad1"
							x1="2.5"
							y1="2"
							x2="21.5"
							y2="22"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#41D1FF" />
							<stop offset="1" stopColor="#BD34FE" />
						</linearGradient>
					</defs>
				</svg>
			)

		case 'vercel':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path d="M12 2L22 20H2L12 2Z" fill="#000000" />
				</svg>
			)

		case 'supabase':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M13.4 22.8C12.8 23.4 11.8 22.9 11.9 22L13 14H3.8C2.8 14 2.2 12.8 2.8 11.9L10.6 1.2C11.2 0.6 12.2 1.1 12.1 2L11 10H20.2C21.2 10 21.8 11.2 21.2 12.1L13.4 22.8Z"
						fill="#3ECF8E"
					/>
				</svg>
			)

		case 'stripe':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<rect width="24" height="24" rx="4" fill="#635BFF" />
					<path
						d="M13.8 9.2C12.7 8.8 11.2 8.6 10.2 9C9.5 9.3 9.1 9.8 9.1 10.5C9.1 12.6 14.8 11.5 14.8 14.7C14.8 16.3 13.4 17.2 11.3 17.2C9.5 17.2 7.8 16.5 6.8 15.7L7.5 13.6C8.7 14.5 10.2 15.1 11.4 15.1C12.3 15.1 12.7 14.7 12.7 14.1C12.7 12 7.1 13 7.1 10C7.1 8.4 8.5 7.2 10.9 7.2C12.5 7.2 13.9 7.7 14.8 8.2L13.8 9.2Z"
						fill="white"
					/>
				</svg>
			)

		case 'git':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M21.7 10.8L13.2 2.3C12.4 1.5 11.1 1.5 10.3 2.3L8.3 4.3L11 7C11.7 6.8 12.5 7 13.1 7.6C13.7 8.2 13.9 9.1 13.7 9.8L16.2 12.3C16.9 12.1 17.8 12.3 18.4 12.9C19.2 13.7 19.2 15 18.4 15.8C17.6 16.6 16.3 16.6 15.5 15.8C14.9 15.2 14.7 14.3 14.9 13.6L12.6 11.3V16.8C12.8 17 12.9 17.3 12.9 17.6C12.9 18.7 12 19.6 10.9 19.6C9.8 19.6 8.9 18.7 8.9 17.6C8.9 16.8 9.4 16.1 10.1 15.8V10.2C9.4 9.9 8.9 9.2 8.9 8.4C8.9 8.1 9 7.8 9.2 7.5L6.5 4.8L2.3 9C1.5 9.8 1.5 11.1 2.3 11.9L10.8 20.4C11.6 21.2 12.9 21.2 13.7 20.4L21.7 12.4C22.5 11.6 22.5 10.3 21.7 10.8Z"
						fill="#F05032"
					/>
				</svg>
			)

		case 'postman':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<circle cx="12" cy="12" r="10" fill="#FF6C37" />
					<path
						d="M7 13L11 9L15 13M11 9V17"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			)

		case 'kubernetes':
		case 'k8s':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#326CE5" />
					<circle cx="12" cy="12" r="4" fill="white" />
				</svg>
			)

		case 'mongodb':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<path
						d="M12 2C11.8 2.2 7 8 7 13C7 16.5 9.2 19.5 12 21C14.8 19.5 17 16.5 17 13C17 8 12.2 2.2 12 2Z"
						fill="#47A248"
					/>
				</svg>
			)

		case 'golang':
		case 'go':
			return (
				<svg viewBox="0 0 24 24" className={className} fill="none">
					<rect width="24" height="24" rx="4" fill="#00ADD8" />
					<text
						x="12"
						y="16"
						fontSize="11"
						fontWeight="bold"
						fill="white"
						textAnchor="middle"
					>
						GO
					</text>
				</svg>
			)

		default:
			return (
				<div
					className={`flex items-center justify-center font-bold text-xs rounded bg-zinc-200 text-zinc-700 ${className}`}
				>
					{name.slice(0, 2).toUpperCase()}
				</div>
			)
	}
}

export default TechIcon
