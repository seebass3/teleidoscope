import { motion } from 'framer-motion'

const inDevelopmentArray = Array(6).fill('In Development')

export default function InDevelopment() {
	return (
		<div className="absolute left-1/2 top-1/2 flex h-[29px] w-[181px] -translate-x-1/2 -translate-y-1/2 transform items-center overflow-hidden bg-slate">
			<motion.div
				className="flex whitespace-nowrap py-2"
				animate={{ x: ['0%', '-50%'] }}
				transition={{
					duration: 15,
					ease: 'linear',
					repeat: Infinity,
				}}
			>
				{inDevelopmentArray.map((text, index) => (
					<span
						key={index}
						className="inline-block px-[6px] font-action text-[12px] uppercase text-solar"
					>
						{text}
					</span>
				))}
			</motion.div>
		</div>
	)
}
