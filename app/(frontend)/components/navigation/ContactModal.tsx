import { fadeAnimVariants, slideInAnimVariants } from '@/app/lib/animate'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Balancer from 'react-wrap-balancer'
import Corner from '../Corner'

interface ContactModalProps {
	closeMenu: () => void
}

export default function ContactModal({ closeMenu }: ContactModalProps) {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	const toggleModal = () => {
		setIsOpen(!isOpen)
		closeMenu()
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<>
			<button
				onClick={toggleModal}
				className="flex h-9 w-[125px] shrink-0 items-center justify-center gap-2 bg-solar px-3 py-2 font-action text-micro uppercase text-white lg:h-[31px]"
			>
				Get In touch
			</button>
			<AnimatePresence mode="wait">
				{isOpen && (
					<>
						<motion.div
							className="fixed right-0 top-0 z-50 h-screen w-1/2 bg-flint text-white"
							initial="hide"
							animate="show"
							exit="hide"
							variants={slideInAnimVariants}
						>
							<div className="container">
								<div className="flex h-full w-full flex-col pb-xl pt-11">
									<button
										className="flex self-end"
										aria-label="Close"
										onClick={closeModal}
									>
										<Close />
									</button>
									<div className="pl-line mt-xl flex flex-col border-l border-sand/35">
										<div className="mb-sm flex items-center justify-between">
											<h2 className="text-xl tracking-[-1.12px] text-solar">
												Let&#39;s Talk
											</h2>
											<Corner />
										</div>
										<p className="text-sm text-sand">
											<Balancer>
												Get in touch with our team to discuss how our innovative
												approaches can advance your mission-critical objectives.
											</Balancer>
										</p>
									</div>
								</div>
							</div>
						</motion.div>
						<motion.div
							className="fixed inset-0 top-0 z-40 bg-flint/45"
							variants={fadeAnimVariants}
							initial="hide"
							animate="show"
							exit="hide"
							onClick={closeModal}
						/>
					</>
				)}
			</AnimatePresence>
		</>
	)
}

const Close = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="31"
			height="31"
			viewBox="0 0 31 31"
			fill="none"
		>
			<rect width="31" height="31" fill="#EEEAE4" />
			<path d="M10 22L22 10" stroke="#1F2424" strokeWidth="2" />
			<path d="M10 10L22 22" stroke="#1F2424" strokeWidth="2" />
		</svg>
	)
}
