'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const logos = [
	{
		name: 'Snpachat',
		image: '/images/logos/snapchat.svg',
	},
	{
		name: 'Microsoft',
		image: '/images/logos/microsoft.svg',
	},
	{
		name: 'Meta',
		image: '/images/logos/meta.svg',
	},
	{
		name: 'Department of Defense',
		image: '/images/logos/dod.svg',
	},
	{
		name: 'SAAB',
		image: '/images/logos/saab.svg',
	},
	{
		name: 'Apple',
		image: '/images/logos/apple.svg',
	},
]

export default function Logos() {
	const duplicatedLogos = [...logos, ...logos]
	return (
		<section id="logos" className="overflow-hidden">
			<div className="relative flex h-[120px] w-full md:h-[160px]">
				<motion.div
					className="flex"
					animate={{
						x: [0, '-50%'],
					}}
					transition={{
						duration: 30,
						ease: 'linear',
						repeat: Infinity,
					}}
				>
					{duplicatedLogos.map((logo, index) => (
						<div
							key={index}
							className="flex min-w-[187.5px] items-center justify-center border border-moss/35 px-10 py-[42px] md:min-w-[250px]"
						>
							<Image
								src={logo.image}
								alt={logo.name}
								width={120}
								height={40}
								className="h-auto w-auto object-contain opacity-35"
							/>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
