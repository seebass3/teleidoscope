'use client'

import {
	expandAnimVariants,
	fadeAnimVariants,
	lineAnimVariants,
	navLiAnimVariants,
	navUlAnimVariants,
} from '@/app/lib/animate'
import { cn } from '@/app/lib/utils'
import { FocusTrap } from 'focus-trap-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Button from '../Button'

interface DesktopNavProps {
	navItems: {
		title: string
		subItems?: {
			title: string
			href: string
		}[]
		href: string
	}[]
	logo: string
}

export default function DesktopNav({ navItems, logo }: DesktopNavProps) {
	const pathname = usePathname()

	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

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
			setLineHeight(lastRect.bottom - offeringsRect.top)
		}
	}

	useEffect(() => {
		updateLeftPosition()
		window.addEventListener('resize', updateLeftPosition)
		const handleResize = () => {
			if (window.innerWidth <= 1024) {
				setIsSubMenuOpen(false)
			} else {
				updateLineHeight()
			}
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', updateLeftPosition)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (isSubMenuOpen) {
			setTimeout(updateLineHeight, 100)
		}
	}, [isSubMenuOpen])

	const toggleMegaNav = () => setIsSubMenuOpen(!isSubMenuOpen)

	const closeMenu = () => {
		setIsSubMenuOpen(false)
	}

	useEffect(() => {
		setIsSubMenuOpen(false)
	}, [pathname])

	return (
		<>
			<FocusTrap
				active={isSubMenuOpen}
				focusTrapOptions={{
					onDeactivate: closeMenu,
				}}
			>
				<div className="flex items-center justify-between gap-[65px] max-lg:hidden">
					<Link className="flex shrink-0" href="/">
						<Image
							className="inline-block h-[23px] w-[158px]"
							src={logo}
							alt="Teleidoscope Logo"
						/>
					</Link>
					<div className="flex w-full flex-shrink items-center justify-between xl:w-[922px]">
						<nav>
							<ul
								role="list"
								className="group pointer-events-none flex w-full items-center gap-[50px]"
							>
								{navItems.map((item) => (
									<li key={item.title}>
										{item.subItems ? (
											<>
												<AnimatePresence>
													{isSubMenuOpen && (
														<motion.div
															className="absolute z-50 bg-moss opacity-35"
															style={{ width: '1px', left: leftPosition - 15 }}
															initial="hide"
															animate="show"
															exit="hide"
															variants={lineAnimVariants(lineHeight - 10)}
														/>
													)}
												</AnimatePresence>
												<button
													className={cn(
														'pointer-events-auto flex items-center gap-1 transition-colors duration-300 hover:!text-flint focus-visible:text-flint group-hover:text-moss',
														isSubMenuOpen && '!text-flint',
													)}
													ref={offeringsRef}
													onClick={toggleMegaNav}
												>
													{item.title}
													<ChevronDown
														className={cn(
															'mt-1 h-4 w-4 transition-transform duration-300',
															isSubMenuOpen && 'rotate-180 transform',
														)}
													/>
												</button>
											</>
										) : (
											<Link
												className={cn(
													'pointer-events-auto transition-colors duration-300 hover:!text-flint focus-visible:text-flint group-hover:text-moss',
													isSubMenuOpen && 'text-moss',
												)}
												href={item.href}
											>
												{item.title}
											</Link>
										)}
									</li>
								))}
							</ul>
						</nav>

						<Link href="/contact" className="w-fit">
							<Button size="small">Get In touch</Button>
						</Link>

						<AnimatePresence mode="wait">
							{isSubMenuOpen && (
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
												className="flex w-full flex-col gap-xs text-moss"
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
																className="peer"
															>
																<Link
																	ref={
																		index === array.length - 1
																			? lastItemRef
																			: undefined
																	}
																	className="transition-color duration-300 hover:text-flint"
																	href={subItem.href}
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
					</div>
				</div>
			</FocusTrap>
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
			<path stroke="none" d="M0 0h24v24H0z" />
			<polyline points="6 9 12 15 18 9" />
		</svg>
	)
}
