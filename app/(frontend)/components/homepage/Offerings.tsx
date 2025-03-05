'use client'

import Algorithms from '@/videos/algorithms.mp4'
import { motion } from 'framer-motion'
import BackgroundVideo from 'next-video/background-video'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import Corner from '../Corner'

const inDevelopmentArray = Array(6).fill('In Development')

export default function Offerings() {
	return (
		<section id="offerings" className="py-2xl">
			<div className="container">
				<div className="flex w-full items-start justify-between border-l border-moss/35 pl-line max-lg:flex-col">
					<div className="flex flex-shrink items-start self-stretch">
						<div className="flex flex-col items-start lg:w-[206px]">
							<h3 className="text-moss max-lg:pb-[32px] max-sm:pb-[20px]">
								Offerings
							</h3>
						</div>
					</div>
					<div className="flex w-full flex-col gap-xl sm:gap-sm lg:w-[937px]">
						{/* Algorithms */}
						<div className="flex w-full self-stretch max-sm:flex-col lg:border-l lg:border-moss/35 lg:pl-line">
							<div className="flex basis-1/2 flex-col justify-between gap-y-xl bg-white px-sm pb-sm pt-[15px] max-sm:order-2 sm:aspect-square sm:pt-md">
								<div className="flex flex-col">
									<h3 className="text-solar">01</h3>
									<h3 className="text-slate">Algorithms</h3>
								</div>
								<div className="flex flex-col gap-y-micro pr-xs md:gap-y-nano">
									<p className="text-slate">
										Nibh non aenean magna cursus blandit. Lacus quis sed
										tincidunt pulvinar tellus. Aenean ultricies vitae interdum
										mauris maecenas mauris eget tristique facilisi.
									</p>
									<Link href="/algorithms" className="max-sm:w-full sm:w-fit">
										<Button
											variant="outlineDark"
											size="custom"
											className="h-[31px] sm:w-[187px] lg:w-[210px]"
										>
											Learn More
										</Button>
									</Link>
								</div>
							</div>
							<div className="relative min-h-[264px] basis-1/2 bg-white max-sm:order-1 sm:aspect-square">
								<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
									<BackgroundVideo
										style={{
											'--media-object-fit': 'cover',
										}}
										src={Algorithms}
									/>
								</div>
								<span className="absolute right-0 top-0">
									<Corner variant="white" />
								</span>
							</div>
						</div>

						{/* Camera Systems */}
						<div className="flex w-full self-stretch max-sm:flex-col lg:border-l lg:border-moss/35 lg:pl-line">
							<div className="flex basis-1/2 flex-col justify-between gap-y-xl bg-white px-sm pb-sm pt-[15px] max-sm:order-2 sm:aspect-square sm:pt-md">
								<div className="flex flex-col">
									<h3 className="text-solar">02</h3>
									<h3 className="text-slate">Camera Systems</h3>
								</div>
								<div className="flex flex-col gap-y-micro pr-xs md:gap-y-nano">
									<p className="text-slate">
										Aenean ultricies vitae interdum mauris maecenas mauris eget
										tristique facilisi. Nibh non aenean magna cursus blandit.
										Lacus quis sed tincidunt pulvinar tellus.
									</p>
									<Link
										href="/camera-systems"
										className="max-sm:w-full sm:w-fit"
									>
										<Button
											variant="outlineDark"
											size="custom"
											className="h-[31px] sm:w-[187px] lg:w-[210px]"
										>
											Learn More
										</Button>
									</Link>
								</div>
							</div>
							<div className="relative min-h-[264px] basis-1/2 bg-white max-sm:order-1 sm:aspect-square">
								<Image
									className="object-cover"
									alt="Algorithms"
									src="/images/camera-systems.jpg"
									fill
									sizes="(min-width: 461px) 50vw, 100vw"
									quality={100}
								/>
								<span className="absolute right-0 top-0">
									<Corner variant="white" />
								</span>
							</div>
						</div>

						{/* Extended Reality Systems */}
						<div className="flex w-full self-stretch max-sm:flex-col lg:border-l lg:border-moss/35 lg:pl-line">
							<div className="flex basis-1/2 flex-col justify-between gap-y-xl bg-white px-sm pb-sm pt-[15px] max-sm:order-2 sm:aspect-square sm:pt-md">
								<div className="flex flex-col">
									<h3 className="text-solar">03</h3>
									<h3 className="text-slate">Extended Reality Systems</h3>
								</div>
								<div className="flex flex-col gap-y-micro pr-xs md:gap-y-nano">
									<p className="text-slate">
										Egestas montes euismod amet cursus feugiat nunc. Odio nunc
										pharetra eget neque. Ut volutpat non dolor massa. Nunc sit
										luctus in rhoncus vel pellentesque diam tempus. Tortor in
										ullamcorper mattis mattis.
									</p>
									<Link
										href="/extended-reality-systems"
										className="max-sm:w-full sm:w-fit"
									>
										<Button
											variant="outlineDark"
											size="custom"
											className="h-[31px] sm:w-[187px] lg:w-[210px]"
										>
											Learn More
										</Button>
									</Link>
								</div>
							</div>
							<div className="relative min-h-[264px] basis-1/2 bg-white max-sm:order-1 sm:aspect-square">
								<Image
									className="object-cover"
									alt="Extended Reality Systems"
									src="/images/extended-reality-systems.jpg"
									fill
									sizes="(min-width: 461px) 50vw, 100vw"
									quality={100}
								/>
								<span className="absolute right-0 top-0">
									<Corner variant="white" />
								</span>
							</div>
						</div>

						{/* Endpoint Accuracy Systems */}
						<div className="flex w-full self-stretch max-sm:flex-col lg:border-l lg:border-moss/35 lg:pl-line">
							<div className="flex basis-1/2 flex-col justify-between gap-y-xl bg-white px-sm pb-sm pt-[15px] max-sm:order-2 sm:aspect-square sm:pt-md">
								<div className="flex flex-col">
									<h3 className="text-solar">04</h3>
									<h3 className="text-slate">Endpoint Accuracy Systems</h3>
								</div>
								<div className="flex flex-col gap-y-micro pr-xs md:gap-y-nano">
									<p className="text-slate">
										Dolor vel elementum fusce pellentesque id. Arcu augue risus
										amet turpis. Quis sit at non leo. Quam orci malesuada nunc
										purus lacus enim.
									</p>
									<Link
										href="/endpoint-accuracy-systems"
										className="max-sm:w-full sm:w-fit"
									>
										<Button
											variant="outlineDark"
											size="custom"
											className="h-[31px] sm:w-[187px] lg:w-[210px]"
										>
											Learn More
										</Button>
									</Link>
								</div>
							</div>
							<div className="relative min-h-[264px] basis-1/2 bg-white max-sm:order-1 sm:aspect-square">
								<Image
									className="object-cover"
									alt="Endpoint Accuracy Systems"
									src="/images/endpoint-accuracy-systems.jpg"
									fill
									sizes="(min-width: 461px) 50vw, 100vw"
									quality={100}
								/>
								<div className="absolute left-1/2 top-1/2 flex h-[29px] w-[181px] -translate-x-1/2 -translate-y-1/2 transform items-center overflow-hidden bg-slate">
									<motion.div
										className="flex whitespace-nowrap py-2"
										animate={{ x: ['0%', '-50%'] }}
										transition={{
											duration: 15,
											ease: 'linear',
											repeat: Infinity,
										}}
									>
										{inDevelopmentArray.map((text, index) => (
											<span
												key={index}
												className="inline-block px-[6px] font-action text-[12px] uppercase text-solar"
											>
												{text}
											</span>
										))}
									</motion.div>
								</div>
								<span className="absolute right-0 top-0">
									<Corner variant="white" />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
