'use client'

import { Careers } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { createDataAttribute, stegaClean } from 'next-sanity'
import { Image } from 'next-sanity/image'
import { useEffect, useState } from 'react'

export type CarouselImage = NonNullable<Careers['imageCarousel']>[number]

export default function ImageCarousel({
	images = [],
	documentId,
	documentType,
	interval = 5000,
}: {
	images: CarouselImage[]
	documentId?: string
	documentType?: string
	interval?: number
}) {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		if (currentIndex >= images.length && images.length > 0) {
			setCurrentIndex(0)
		}
	}, [images.length, currentIndex])

	useEffect(() => {
		if (images.length <= 1) return

		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex >= images.length - 1 ? 0 : prevIndex + 1,
			)
		}, interval)

		return () => clearInterval(intervalId)
	}, [images.length, interval])

	return (
		<div className="flex h-full w-full flex-col gap-y-nano">
			<div className="relative aspect-square h-full w-full">
				<AnimatePresence mode="sync" initial={false}>
					<motion.div
						key={`image-${currentIndex}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8 }}
						className="absolute h-full w-full"
					>
						{images[currentIndex] && images[currentIndex].asset?._ref && (
							<Image
								data-sanity={createDataAttribute({
									id: documentId,
									type: documentType,
									path: `careers.imageCarousel[_key=="${images[currentIndex]._key}"]`,
								}).toString()}
								src={
									urlForImage(images[currentIndex])
										?.width(800)
										.auto('format')
										.url() as string
								}
								alt={stegaClean(images[currentIndex].alt) || 'Carousel Image'}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover"
								priority={currentIndex === 0}
							/>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
			{images.length > 1 && (
				<div className="flex h-[16px] w-full justify-between">
					{images.map((_, index) => (
						<div key={index}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="2"
								height={index === currentIndex ? '16' : '8'}
								viewBox={`0 0 2 ${index === currentIndex ? 16 : 8}`}
								fill="none"
							>
								<path
									d={index === currentIndex ? 'M1 0L0.999999 16' : 'M1 0V8'}
									stroke={index === currentIndex ? '#FF6D00' : '#EEEAE4'}
									strokeWidth={index === currentIndex ? '2' : '1'}
									opacity={index === currentIndex ? '1' : '0.35'}
								/>
							</svg>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
