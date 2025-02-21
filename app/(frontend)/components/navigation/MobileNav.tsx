'use client'

import {
	expandAnimVariants,
	fadeAnimVariants,
	logoTransitionVariants,
	navLiAnimVariants,
	navUlAnimVariants,
} from '@/app/lib/animate'
// import { useScrollBlock } from '@/app/lib/hooks/useScrollBlock'
import { useScreenDetect } from '@/app/lib/hooks/useScreenDetect'
import { FocusTrap } from 'focus-trap-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '../Button'

interface MobileNavProps {
	navItems: {
		title: string
		subItems?: {
			title: string
			href: string
		}[]
		href: string
	}[]
	logo: string
	badge: string
}

export default function MobileNav({ navItems, logo, badge }: MobileNavProps) {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { isMobile } = useScreenDetect()
	// const [blockScroll, allowScroll] = useScrollBlock()

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsMenuOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const closeMenu = () => setIsMenuOpen(false)

	// useEffect(() => {
	// 	if (isMenuOpen) {
	// 		blockScroll()
	// 	} else {
	// 		allowScroll()
	// 	}
	// }, [isMenuOpen, blockScroll, allowScroll])

	useEffect(() => {
		setIsMenuOpen(false)
	}, [pathname])

	return (
		<>
			<FocusTrap
				active={isMenuOpen}
				focusTrapOptions={{
					onDeactivate: closeMenu,
				}}
			>
				<div className="flex items-center gap-[65px] lg:hidden">
					<Link
						className="relative flex h-[31px] shrink-0 overflow-hidden lg:hidden"
						href="/"
					>
						<AnimatePresence mode="wait">
							{isMenuOpen && isMobile ? (
								<motion.span
									key="badge"
									variants={logoTransitionVariants}
									initial="hide"
									animate="show"
									exit="hide"
								>
									<Image
										className="inline-block h-[31px] w-[31px]"
										src={badge}
										alt="Teleidoscope Logo"
									/>
								</motion.span>
							) : (
								<motion.span
									key="logo"
									variants={logoTransitionVariants}
									initial="hide"
									animate="show"
									exit="hide"
								>
									<Image
										className="inline-block h-[31px] w-[213px]"
										src={logo}
										alt="Teleidoscope Logo"
									/>
								</motion.span>
							)}
						</AnimatePresence>
					</Link>
					<div className="flex w-full flex-shrink items-center justify-end gap-x-2">
						<Link href="/contact" className="max-md:hidden">
							<Button size="small">Get In touch</Button>
						</Link>
						<button
							className="relative flex h-[36px] w-[36px] items-center justify-center bg-flint text-moss"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<motion.span
								className="absolute w-[14px]"
								style={{
									y: '-50%',
									left: '50%',
									x: '-50%',
									top: 'calc(50% - 3px)',
								}}
								animate={
									isMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }
								}
								transition={{ duration: 0.2 }}
							>
								<HamburgerLine />
							</motion.span>
							<motion.span
								className="absolute w-[14px]"
								style={{
									y: '-50%',
									left: '50%',
									x: '-50%',
									top: 'calc(50% + 3px)',
								}}
								animate={
									isMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }
								}
								transition={{ duration: 0.2 }}
							>
								<HamburgerLine />
							</motion.span>
						</button>

						<AnimatePresence mode="wait">
							{isMenuOpen && (
								<>
									<motion.div
										className="fixed left-0 right-0 top-header-height z-30 w-full bg-white max-md:bottom-0 max-md:h-full"
										variants={expandAnimVariants}
										initial="hide"
										animate="show"
										exit="hide"
									>
										<div className="container-mobileNav">
											<div className="flex h-full w-full flex-col max-md:justify-between max-md:pb-9 max-md:pt-xl md:pb-xl md:pt-lg">
												<nav>
													<motion.ul
														className="group pointer-events-none flex flex-col max-md:gap-y-10 md:gap-y-md"
														variants={navUlAnimVariants}
														initial="hide"
														animate="show"
														exit="hide"
													>
														{navItems.map((item) => (
															<motion.li
																key={item.title}
																variants={fadeAnimVariants}
															>
																{item.subItems ? (
																	<div className="group/offerings flex flex-col border-l border-moss/35 pl-line max-md:gap-y-8 md:gap-y-sm">
																		<p className="transition-colors duration-300 group-hover/offerings:!text-flint group-hover:text-moss max-md:text-xl max-md:tracking-[-0.8px] md:text-lg md:tracking-[-0.56px]">
																			{item.title}
																		</p>
																		<motion.ul
																			className="flex w-full flex-col max-md:gap-8 md:gap-4"
																			variants={navUlAnimVariants}
																			initial="hide"
																			animate="show"
																			exit="hide"
																		>
																			{item.subItems.map((subItem) => (
																				<motion.li
																					key={subItem.title}
																					variants={navLiAnimVariants}
																				>
																					<Link
																						href={subItem.href}
																						className="pointer-events-auto py-2 text-sm text-flint transition-colors duration-300 ease-in-out hover:!text-flint group-hover:text-moss"
																						onClick={closeMenu}
																					>
																						{subItem.title}
																					</Link>
																				</motion.li>
																			))}
																		</motion.ul>
																	</div>
																) : (
																	<Link
																		href={item.href}
																		className="pointer-events-auto ml-line py-2 text-flint transition-colors duration-300 ease-in-out hover:!text-flint group-hover:text-moss max-md:text-xl max-md:tracking-[-0.8px] md:text-lg md:tracking-[-0.56px]"
																		onClick={closeMenu}
																	>
																		{item.title}
																	</Link>
																)}
															</motion.li>
														))}
													</motion.ul>
												</nav>
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1, transition: { delay: 0.8 } }}
													exit={{ opacity: 0, transition: { delay: 0 } }}
												>
													<Link href="/contact" className="md:hidden">
														<Button size="small">Get In touch</Button>
													</Link>
												</motion.div>
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
					</div>
				</div>
			</FocusTrap>
		</>
	)
}

const HamburgerLine = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="2"
			viewBox="0 0 14 2"
			fill="none"
		>
			<path d="M0 1H14" stroke="#EEEAE4" strokeWidth="2" />
		</svg>
	)
}
