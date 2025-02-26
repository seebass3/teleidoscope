'use client'

import {
	fadeAnimVariants,
	slideDownAnimVariants,
	slideInAnimVariants,
} from '@/app/lib/animate'
import { useScreenDetect } from '@/app/lib/hooks/useScreenDetect'
import Badge from '@/branding/badge-light.svg'
import Logo from '@/branding/logo-light.svg'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type ElementRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const dialogRef = useRef<ElementRef<'dialog'>>(null)
	const [isOpen, setIsOpen] = useState(false)
	const { isMobile, isTablet } = useScreenDetect()

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal()
			setIsOpen(true)
		}
	}, [])

	function onDismiss() {
		setIsOpen(false)
	}

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault()
				onDismiss()
			}
		}

		document.addEventListener('keydown', handleEscapeKey)
		return () => {
			document.removeEventListener('keydown', handleEscapeKey)
		}
	}, [])

	return createPortal(
		<dialog className="backdrop:bg-transparent" ref={dialogRef}>
			<AnimatePresence mode="wait" onExitComplete={() => router.back()}>
				{isOpen && (
					<>
						<motion.div
							className="fixed right-0 top-0 z-50 w-full bg-flint max-md:h-full lg:bottom-0 lg:h-full lg:w-[55%]"
							initial="hide"
							animate="show"
							exit="hide"
							variants={
								isMobile
									? slideInAnimVariants
									: isTablet
										? slideDownAnimVariants
										: slideInAnimVariants
							}
						>
							<div className="container-header h-auto">
								<div className="flex items-center justify-between pb-0 md:pb-[18px] lg:justify-end lg:pb-0">
									<Link
										className="flex h-[31px] shrink-0 overflow-hidden lg:hidden"
										href="/"
									>
										<AnimatePresence mode="wait">
											{isMobile ? (
												<motion.span
													key="badge"
													initial={{ rotateX: -90 }}
													animate={{ rotateX: 0 }}
													exit={{ rotateX: 90 }}
													transition={{
														duration: 0.4,
														ease: [0.16, 1, 0.3, 1],
													}}
													style={{
														transformStyle: 'preserve-3d',
														backfaceVisibility: 'hidden',
													}}
												>
													<Image
														className="inline-block h-[31px] w-[31px]"
														src={Badge}
														alt="Teleidoscope Logo"
													/>
												</motion.span>
											) : (
												<motion.span
													key="logo"
													initial={{ rotateX: -90 }}
													animate={{ rotateX: 0 }}
													exit={{ rotateX: 90 }}
													transition={{
														duration: 0.4,
														ease: [0.16, 1, 0.3, 1],
													}}
													style={{
														transformStyle: 'preserve-3d',
														backfaceVisibility: 'hidden',
													}}
												>
													<Image
														className="inline-block h-[31px] w-[213px]"
														src={Logo}
														alt="Teleidoscope Logo"
													/>
												</motion.span>
											)}
										</AnimatePresence>
									</Link>
									<button
										className="flex items-center justify-center self-end lg:h-[31px] lg:w-[31px]"
										aria-label="Close"
										onClick={onDismiss}
									>
										<Close />
									</button>
								</div>
							</div>
							<div className="container">
								<div className="flex h-full w-full flex-col py-xl md:pb-xl md:pt-lg">
									{children}
								</div>
							</div>
						</motion.div>
						<motion.div
							className="fixed inset-0 z-40 bg-flint/45"
							variants={fadeAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
						/>
					</>
				)}
			</AnimatePresence>
		</dialog>,
		document.getElementById('modal-root')!,
	)
}

const Close = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 36 36"
		fill="none"
	>
		<rect width="36" height="36" fill="#EEEAE4" />
		<path d="M12 24L24 12" stroke="#1F2424" strokeWidth="2" />
		<path d="M12 12L24 24" stroke="#1F2424" strokeWidth="2" />
	</svg>
)
