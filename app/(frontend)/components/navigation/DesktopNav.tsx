import {
	expandAnimVariants,
	fadeAnimVariants,
	lineAnimVariants,
	swipeAnimVariants,
} from '@/app/lib/animate'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function DesktopNav() {
	const [isOpen, setIsOpen] = useState(false)
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

	const toggleMegaNav = () => {
		setIsOpen(!isOpen)
	}

	const closeMenu = () => {
		setIsOpen(false)
	}

	return (
		<>
			<ul role="list" className="flex items-center gap-4 md:gap-6">
				<li>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								className="absolute z-50 w-[1px] bg-moss"
								style={{ left: leftPosition - 15 }}
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
							className={clsx(
								'mt-1 h-4 w-4 transition-all duration-200',
								isOpen ? 'rotate-180 transform text-flint' : 'text-moss',
							)}
						/>
					</button>
				</li>
				<li>
					<Link className="nav-item" href="/about" onClick={closeMenu}>
						Company
					</Link>
				</li>
				<li>
					<Link className="nav-item" href="/about" onClick={closeMenu}>
						Updates
					</Link>
				</li>

				<li className="sm:before:bg-gray-100 flex before:block sm:gap-4 sm:before:w-[1px] md:gap-6">
					<Link
						className="flex h-8 w-32 items-center justify-center gap-2 bg-solar p-1 text-white transition-colors duration-200 hover:bg-flint"
						href="https://github.com/sanity-io/sanity-template-nextjs-clean"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="">Get In touch</span>
					</Link>
				</li>
			</ul>
			<AnimatePresence mode="wait">
				{isOpen && (
					<>
						<motion.div
							className="fixed left-0 top-header-height z-40 w-full bg-white"
							variants={expandAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
						>
							<div
								className="max-w-screen-xl relative mx-auto h-full w-full"
								style={{ left: leftPosition }}
							>
								<motion.div
									className="pb-12 pt-2"
									variants={swipeAnimVariants}
									initial="hide"
									animate="show"
									exit="hide"
								>
									<ul className="flex flex-col gap-5">
										<li>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Algorithms
											</Link>
										</li>
										<li>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Camera Systems
											</Link>
										</li>
										<li>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Extended Reality Systems
											</Link>
										</li>
										<li ref={lastItemRef}>
											<Link
												className="nav-item"
												href="/about"
												onClick={closeMenu}
											>
												Endpoint Accuracy Systems
											</Link>
										</li>
									</ul>
								</motion.div>
							</div>
						</motion.div>
						<motion.div
							className="fixed inset-0 top-header-height z-30 bg-black/50"
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

function ChevronDown({ className }: { className: string }) {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			{' '}
			<path stroke="none" d="M0 0h24v24H0z" />{' '}
			<polyline points="6 9 12 15 18 9" />
		</svg>
	)
}
