'use client'

import {
	expandAnimVariants,
	navLiAnimVariants,
	navUlAnimVariants,
} from '@/app/lib/animate'
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

			<AnimatePresence mode="wait">
				{isOpen && (
					<>
						<motion.div
							className="fixed left-0 right-0 top-header-height z-30 w-full bg-white"
							variants={expandAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
						>
							<div className="container-mobileNav">
								<div className="flex h-full w-full flex-col pb-xl pt-lg">
									<nav>
										<motion.ul
											className="group flex flex-col gap-y-md"
											variants={navUlAnimVariants}
											initial="hide"
											animate="show"
											exit="hide"
										>
											{navItems.map((item) => (
												<motion.li
													key={item.title}
													variants={navLiAnimVariants}
												>
													{item.subItems ? (
														<div className="flex flex-col gap-y-sm border-l border-moss/35 pl-line">
															<p className="text-lg font-normal tracking-[-0.56px]">
																{item.title}
															</p>
															<ul className="flex w-full flex-col gap-4">
																{item.subItems.map((subItem) => (
																	<li key={subItem.title}>
																		<Link
																			href={subItem.href}
																			className="text-sm text-flint transition-colors duration-200 ease-in-out hover:!text-flint group-hover:text-moss"
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
															className="p-line text-lg tracking-[-0.56px] text-flint transition-colors duration-200 ease-in-out hover:!text-flint group-hover:text-moss"
															onClick={closeMenu}
														>
															{item.title}
														</Link>
													)}
												</motion.li>
											))}
										</motion.ul>
									</nav>
									<div className="mt-auto md:hidden">
										<ContactModal closeMenu={closeMenu} />
									</div>
								</div>
							</div>
						</motion.div>
						<motion.div
							className="fixed inset-0 top-header-height z-20 bg-flint/45"
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
