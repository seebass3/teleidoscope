'use client'

import {
	expandAnimVariants,
	fadeAnimVariants,
	lineAnimVariants,
	navLiAnimVariants,
	navUlAnimVariants,
} from '@/app/lib/animate'
import { cn } from '@/app/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ContactModal from './ContactModal'

interface DesktopNavProps {
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

export default function DesktopNav({
	navItems,
	isOpen,
	setIsOpen,
	onClose,
}: DesktopNavProps) {
	const offeringsRef = useRef<HTMLButtonElement>(null)
	const lastItemRef = useRef<HTMLLIElement>(null)
	const [leftPosition, setLeftPosition] = useState(0)
	const [lineHeight, setLineHeight] = useState(0)

	const updatePosition = () => {
		if (offeringsRef.current) {
			setLeftPosition(offeringsRef.current.getBoundingClientRect().left)
		}
		if (lastItemRef.current && offeringsRef.current) {
			const lastRect = lastItemRef.current.getBoundingClientRect()
			const offeringsRect = offeringsRef.current.getBoundingClientRect()
			setLineHeight(lastRect.bottom - offeringsRect.top)
		}
	}

	useEffect(() => {
		updatePosition()
		window.addEventListener('resize', updatePosition)

		return () => {
			window.removeEventListener('resize', updatePosition)
		}
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			setTimeout(updatePosition, 0)
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	const toggleMegaNav = () => setIsOpen(!isOpen)

	const closeMenu = () => {
		onClose()
	}

	return (
		<>
			<ul
				role="list"
				className="flex w-full items-center gap-4 max-lg:hidden md:gap-6"
			>
				{navItems.map((item) => (
					<li key={item.title}>
						{item.subItems ? (
							<>
								<AnimatePresence>
									{isOpen && (
										<motion.div
											className="absolute z-50 bg-moss"
											style={{ width: '1px', left: leftPosition - 15 }}
											initial="hide"
											animate="show"
											exit="hide"
											variants={lineAnimVariants(lineHeight)}
										/>
									)}
								</AnimatePresence>
								<button
									className="nav-item flex items-center gap-1"
									ref={offeringsRef}
									onClick={toggleMegaNav}
								>
									Offerings
									<ChevronDown
										className={cn(
											'mt-1 h-4 w-4 transition-all duration-200',
											isOpen ? 'rotate-180 transform text-flint' : 'text-moss',
										)}
									/>
								</button>
							</>
						) : (
							<Link className="nav-item" href={item.href} onClick={closeMenu}>
								{item.title}
							</Link>
						)}
					</li>
				))}
			</ul>

			<ContactModal closeMenu={closeMenu} />

			<AnimatePresence mode="wait">
				{isOpen && (
					<>
						<motion.div
							className="fixed left-0 top-header-height z-30 w-full bg-white"
							variants={expandAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
						>
							<div
								className="max-w-screen-xl relative mx-auto h-full w-full"
								style={{ left: leftPosition }}
							>
								<div className="pb-12 pt-2">
									<motion.ul
										className="flex w-full flex-col gap-5"
										variants={navUlAnimVariants}
										initial="hide"
										animate="show"
										exit="hide"
									>
										<motion.li variants={navLiAnimVariants}>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Algorithms
											</Link>
										</motion.li>
										<motion.li variants={navLiAnimVariants}>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Camera Systems
											</Link>
										</motion.li>
										<motion.li variants={navLiAnimVariants}>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Extended Reality Systems
											</Link>
										</motion.li>
										<motion.li variants={navLiAnimVariants} ref={lastItemRef}>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Endpoint Accuracy Systems
											</Link>
										</motion.li>
									</motion.ul>
								</div>
							</div>
						</motion.div>
						<motion.div
							className="fixed inset-0 top-header-height z-20 bg-flint/45"
							variants={fadeAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
							onClick={closeMenu}
						/>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

const ChevronDown = ({ className }: { className: string }) => {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			{' '}
			<path stroke="none" d="M0 0h24v24H0z" />{' '}
			<polyline points="6 9 12 15 18 9" />
		</svg>
	)
}
