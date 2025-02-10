'use client'

import { expandAnimVariants } from '@/app/lib/animate'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect } from 'react'
import ContactModal from './ContactModal'

interface MobileNavProps {
	navItems: {
		title: string
		subItems?: {
			title: string
			href: string
		}[]
		href: string
	}[]
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	onClose: () => void
}

export default function MobileNav({
	navItems,
	isOpen,
	setIsOpen,
	onClose,
}: MobileNavProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	const closeMenu = () => onClose()

	return (
		<div className="lg:hidden">
			<button
				className="relative ml-2 flex h-9 w-9 items-center justify-center bg-flint text-moss"
				onClick={() => setIsOpen(!isOpen)}
			>
				<motion.span
					className="absolute h-0.5 w-[14px] -translate-x-1/2 bg-sand"
					style={{ top: 'calc(50% - 3px)' }}
					animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
					transition={{ duration: 0.2 }}
				/>
				<motion.span
					className="absolute h-0.5 w-[14px] -translate-x-1/2 bg-sand"
					style={{ top: 'calc(50% + 3px)' }}
					animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
					transition={{ duration: 0.2 }}
				/>
			</button>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							className="fixed inset-0 top-header-height z-40 bg-white"
							variants={expandAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
						>
							<div className="flex h-full flex-col px-6 py-8">
								<nav className="space-y-8">
									<ul className="space-y-6">
										{navItems.map((item) => (
											<motion.li
												key={item.title}
												initial={{ opacity: 0, x: 20 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: 20 }}
												transition={{ duration: 0.2 }}
											>
												{item.subItems ? (
													<div className="space-y-4">
														<p className="text-lg font-medium text-moss">
															{item.title}
														</p>
														<ul className="ml-4 space-y-4">
															{item.subItems.map((subItem) => (
																<li key={subItem.title}>
																	<Link
																		href={subItem.href}
																		className="text-base"
																		onClick={closeMenu}
																	>
																		{subItem.title}
																	</Link>
																</li>
															))}
														</ul>
													</div>
												) : (
													<Link
														href={item.href}
														className="text-lg font-medium"
														onClick={closeMenu}
													>
														{item.title}
													</Link>
												)}
											</motion.li>
										))}
									</ul>
								</nav>
								<div className="mt-auto max-md:hidden">
									<ContactModal closeMenu={closeMenu} />
								</div>
							</div>
						</motion.div>
						<motion.div
							className="fixed inset-0 top-header-height z-30 bg-flint/45"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={closeMenu}
						/>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}
