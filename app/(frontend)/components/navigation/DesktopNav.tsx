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
	const lastItemRef = useRef<HTMLAnchorElement>(null)
	const [leftPosition, setLeftPosition] = useState(0)
	const [lineHeight, setLineHeight] = useState(0)

	const updateLeftPosition = () => {
		if (offeringsRef.current) {
			setLeftPosition(offeringsRef.current.getBoundingClientRect().left)
		}
	}

	const updateLineHeight = () => {
		if (lastItemRef.current && offeringsRef.current) {
			const lastRect = lastItemRef.current.getBoundingClientRect()
			const offeringsRect = offeringsRef.current.getBoundingClientRect()
			setLineHeight(lastRect.bottom - offeringsRect.top - 10)
		}
	}

	useEffect(() => {
		updateLeftPosition()
		window.addEventListener('resize', updateLeftPosition)
		return () => {
			window.removeEventListener('resize', updateLeftPosition)
		}
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			setTimeout(updateLineHeight, 100)
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
			<nav className="max-lg:hidden">
				<ul role="list" className="flex w-full items-center gap-[50px]">
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
										className={cn(
											'flex items-center gap-1',
											isOpen && 'text-flint',
										)}
										ref={offeringsRef}
										onClick={toggleMegaNav}
									>
										{item.title}
										<ChevronDown
											className={cn(
												'mt-1 h-4 w-4 transition-all duration-200',
												isOpen && 'rotate-180 transform',
											)}
										/>
									</button>
								</>
							) : (
								<Link className="" href={item.href} onClick={closeMenu}>
									{item.title}
								</Link>
							)}
						</li>
					))}
				</ul>
			</nav>

			<div className="max-md:hidden">
				<ContactModal closeMenu={closeMenu} />
			</div>

			<AnimatePresence mode="wait">
				{isOpen && (
					<>
						<motion.div
							className="fixed left-0 top-header-height z-30 w-full bg-white max-lg:hidden"
							variants={expandAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
						>
							<nav
								className="relative h-full w-[215px] pb-[52px] pt-5"
								style={{ left: leftPosition }}
							>
								<motion.ul
									className="flex w-full flex-col gap-xs"
									variants={navUlAnimVariants}
									initial="hide"
									animate="show"
									exit="hide"
								>
									{navItems.map(
										(item) =>
											item.subItems &&
											item.subItems.map((subItem, index, array) => (
												<motion.li
													key={subItem.title}
													variants={navLiAnimVariants}
												>
													<Link
														ref={
															index === array.length - 1
																? lastItemRef
																: undefined
														}
														className=""
														href="/about"
														onClick={closeMenu}
													>
														{subItem.title}
													</Link>
												</motion.li>
											)),
									)}
								</motion.ul>
							</nav>
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
