'use client'

import { cn } from '@/app/lib/utils'
import { Page as PageType } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { createDataAttribute, stegaClean } from 'next-sanity'
import { Image } from 'next-sanity/image'
import BackgroundPlayer from 'next-video/background-player'
import React from 'react'
import Button from '../Button'
import { ContactFormPage } from '../contact/ContactFormPage'
import Corner from '../Corner'
import Seperator from '../Seperator'
import Hero from './Hero'

const MUX_BASE_VIDEO_URL = 'https://stream.mux.com/'
const MUX_BASE_IMAGE_URL = 'https://image.mux.com/'

export default function OfferingLayout({ page }: { page: PageType }) {
	const {
		_id,
		_type,
		title,
		hero,
		inDevelopment,
		heading,
		features,
		productSpecs,
		inTheNews,
		useCases,
		contactForm,
	} = page
	return (
		<>
			<div className="container pt-[160px] lg:pt-[200px]">
				<h1 className="mb-sm pl-line text-slate">{title}</h1>
			</div>
			<Hero
				hero={hero}
				inDevelopment={inDevelopment}
				documentId={_id}
				documentType={_type}
			/>
			{heading && (
				<div className="container pt-xl">
					<div className="flex justify-center lg:justify-start xl:justify-end">
						<div className="flex justify-between gap-x-micro border-l border-moss/35 pl-line lg:ml-[223px] lg:w-[816px] xl:w-[937px]">
							<div className="w-full max-w-[816px] space-y-8">
								{heading.map((heading) => (
									<h3 key={heading._key} className="text-slate">
										{heading.text}
									</h3>
								))}
							</div>
							<Corner variant="solar" />
						</div>
					</div>
				</div>
			)}
			<section id="features" className="py-2xl">
				<div className="container">
					<div className="flex w-full justify-between gap-y-sm border-l border-moss/35 pl-line max-lg:flex-col">
						<div className="lg:min-w-[206px]">
							<h3 className="text-moss">Features</h3>
						</div>

						<div className="flex w-full flex-col gap-xl xl:w-[937px]">
							{features?.map((feature, index) => (
								<div
									key={index}
									className="flex w-full flex-col gap-xl sm:gap-sm"
								>
									<div className="flex w-full flex-col gap-sm self-stretch max-sm:flex-col lg:border-l lg:border-moss/35 lg:pl-line xl:flex-row">
										<div
											data-sanity={createDataAttribute({
												id: _id,
												type: _type,
												path:
													feature.media?.mediaType === 'video'
														? `features[_key=="${feature._key}"].media.video`
														: `features[_key=="${feature._key}"].media.image`,
											}).toString()}
											className="clip-path relative h-[198px] w-full sm:h-[354px] xl:h-[323px]"
										>
											<div className="absolute inset-0 z-10 h-full w-full bg-linear-gradient" />
											{feature.media?.mediaType === 'video' &&
												feature.media.video && (
													<BackgroundPlayer
														playbackId={feature.media.video.playbackId}
														src={`${MUX_BASE_VIDEO_URL}${feature.media.video.playbackId}.m3u8`}
														poster={`${MUX_BASE_IMAGE_URL}${feature.media.video.playbackId}/thumbnail.jpg?time=0`}
														className="absolute inset-0 h-full overflow-hidden"
														style={{
															'--media-object-fit': 'cover',
															aspectRatio: 'unset',
														}}
													/>
												)}
											{feature.media?.mediaType === 'image' &&
												feature.media?.image?.asset && (
													<div className="absolute inset-0">
														<Image
															className="object-cover"
															src={
																urlForImage(feature.media.image)
																	?.width(1280)
																	.auto('format')
																	.url() as string
															}
															alt={
																stegaClean(feature.media.image.alt) ||
																feature.title
															}
															fill
															sizes="(min-width: 605px) 50vw, 100vw"
															priority
														/>
													</div>
												)}
										</div>
										<div className="flex shrink-0 flex-col gap-2 xl:w-[287px]">
											<div className="flex justify-between">
												<h4 className="text-slate">{feature.title}</h4>
												<Corner variant="solar" />
											</div>
											<p className="max-w-[551px] text-slate">
												{feature.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section id="product-specs" className={cn(inTheNews?.active && 'pb-2xl')}>
				<div className="container">
					<div className="flex flex-col gap-y-md lg:flex-row lg:border-l lg:border-moss/35 lg:pl-line">
						<div className="flex basis-1/2 flex-col gap-y-sm max-lg:border-l max-lg:border-moss/35 max-lg:pl-line lg:pr-[15px]">
							<div className="flex justify-between">
								<h2 className="text-slate">Product Specs</h2>
								<Corner variant="solar" />
							</div>
							{productSpecs?.description && (
								<p className="max-w-[551px] lg:w-[393px]">
									{productSpecs.description}
								</p>
							)}
						</div>
						<div className="flex w-full basis-1/2 border-l border-moss/35 pl-line">
							<div className="flex w-full flex-col gap-y-sm bg-white px-md py-lg">
								{productSpecs?.rows?.map((row, index, array) => (
									<React.Fragment key={index}>
										<div className="flex h-full w-full gap-x-md self-stretch md:gap-x-xs lg:gap-x-sm">
											<div className="flex basis-1/2 items-start justify-start font-mono text-micro uppercase text-solar">
												<p>{row.category}</p>
											</div>
											<div className="flex basis-1/2 flex-col items-start justify-start gap-y-4 font-mono text-micro uppercase text-slate">
												{row.items?.map((item, index) => (
													<p key={index}>{item}</p>
												))}
											</div>
										</div>
										{index < array.length - 1 && (
											<div className="flex-shrink-0 self-stretch">
												<Seperator orientation="horizontal" variant="moss" />
											</div>
										)}
									</React.Fragment>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
			{inTheNews?.active && (
				<section id="featured-news" className="bg-moss py-2xl">
					<div className="container">
						<div className="flex w-full items-start justify-between gap-y-sm border-l border-sand/35 pl-line max-lg:flex-col">
							<div className="lg:min-w-[206px]">
								<h3 className="text-slate">In the news</h3>
							</div>

							<div className="flex w-full flex-col gap-xl xl:w-[937px]">
								<div className="flex w-full flex-col gap-xl sm:gap-sm lg:border-l lg:border-sand/35 lg:pl-line">
									<div className="flex justify-between">
										<h3 className="text-sand lg:max-w-[604px]">
											{inTheNews.heading}
										</h3>
										<Corner variant="sand" />
									</div>
									<div className="flex w-full flex-col gap-sm self-stretch max-sm:flex-col xl:flex-row">
										<div className="clip-path relative h-[198px] w-full sm:h-[354px] xl:h-[323px]">
											<div
												data-sanity={createDataAttribute({
													id: _id,
													type: _type,
													path: 'inTheNews.image',
												}).toString()}
												className="absolute inset-0"
											>
												<Image
													className="object-cover"
													src={
														urlForImage(inTheNews.image)
															?.width(1920)
															.auto('format')
															.url() as string
													}
													alt={stegaClean(inTheNews.image?.alt) || ''}
													fill
													sizes="(min-width: 605px) 50vw, 100vw"
													priority
												/>
											</div>
										</div>
										<div className="flex shrink-0 flex-col justify-between gap-y-4 md:flex-row xl:w-[287px] xl:flex-col">
											<p className="mr-7 text-sand md:max-w-[325px]">
												{inTheNews.excerpt}
											</p>
											<a
												className="h-fit"
												href={inTheNews.url}
												target="_blank"
												rel="noreferrer"
											>
												<Button
													variant="outlineLight"
													size="custom"
													className="h-fit md:w-fit xl:w-full"
												>
													Read More on {inTheNews.source}
												</Button>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
			<section id="use-cases" className="py-2xl">
				<div className="container">
					<div className="flex w-full items-start justify-between border-l border-moss/35 pl-line max-lg:flex-col max-lg:gap-y-lg">
						<div className="lg:min-w-[206px]">
							<h3 className="text-moss">In Use</h3>
						</div>
						<div className="flex w-full flex-col gap-y-xl lg:w-[937px]">
							{useCases &&
								useCases.length > 0 &&
								[...Array(Math.ceil(useCases.length / 2))].map(
									(_, rowIndex) => {
										const firstIndex = rowIndex * 2
										const secondIndex = firstIndex + 1
										const firstCase = useCases![firstIndex]
										const secondCase =
											secondIndex < useCases!.length
												? useCases![secondIndex]
												: null

										const isEvenRow = rowIndex % 2 === 0

										return (
											<div
												key={rowIndex}
												className="relative flex w-full flex-row gap-x-line gap-y-xl max-md:flex-col"
											>
												<div className="flex-shrink-0 self-stretch max-lg:hidden">
													<Seperator orientation="vertical" variant="moss" />
												</div>

												<div
													className={cn(
														'ml-px flex w-full md:w-1/2',
														isEvenRow ? 'lg:w-[44%]' : 'lg:w-[56%]',
													)}
												>
													<div className="flex w-full flex-col gap-y-sm">
														<div className="flex flex-col gap-y-xs">
															<div className="flex justify-between">
																<h3 className="text-slate">
																	{firstCase.title}
																</h3>
																<Corner variant="solar" />
															</div>
															<div
																data-sanity={createDataAttribute({
																	id: _id,
																	type: _type,
																	path: `useCases[_key=="${firstCase._key}"].image`,
																}).toString()}
																className={cn(
																	'clip-path relative w-full overflow-hidden max-lg:aspect-square',
																	isEvenRow
																		? 'aspect-square'
																		: 'aspect-[499/393]',
																)}
															>
																<Image
																	className="object-cover"
																	src={
																		urlForImage(firstCase.image)
																			?.width(1280)
																			.auto('format')
																			.url() as string
																	}
																	alt={stegaClean(firstCase.image?.alt) || ''}
																	fill
																	sizes="(min-width: 499px) 50vw, 100vw"
																/>
															</div>
														</div>
														<p className="text-slate">
															{firstCase.description}
														</p>
													</div>
												</div>

												{secondCase && (
													<div className="flex-shrink-0 self-stretch max-lg:hidden">
														<Seperator orientation="vertical" variant="moss" />
													</div>
												)}

												{secondCase && (
													<div
														className={cn(
															'flex w-full flex-grow md:w-1/2',
															isEvenRow ? 'lg:w-[56%]' : 'lg:w-[44%]',
														)}
													>
														<div className="flex h-full w-full flex-col gap-y-sm">
															<div className="flex flex-col gap-y-xs">
																<div className="flex justify-between">
																	<h3 className="text-slate">
																		{secondCase.title}
																	</h3>
																	<Corner variant="solar" />
																</div>
																<div
																	data-sanity={createDataAttribute({
																		id: _id,
																		type: _type,
																		path: `useCases[_key=="${secondCase._key}"].image`,
																	}).toString()}
																	className={cn(
																		'clip-path relative w-full overflow-hidden max-lg:aspect-square',
																		isEvenRow
																			? 'aspect-[497/391]'
																			: 'aspect-square',
																	)}
																>
																	<Image
																		className="min-h-full min-w-full object-cover"
																		src={
																			urlForImage(secondCase.image)
																				?.width(1280)
																				.auto('format')
																				.url() as string
																		}
																		alt={stegaClean(secondCase.title) || ''}
																		fill
																		sizes="(min-width: 499px) 50vw, 100vw"
																	/>
																</div>
															</div>
															<p className="text-slate">
																{secondCase.description}
															</p>
														</div>
													</div>
												)}
											</div>
										)
									},
								)}
						</div>
					</div>
				</div>
			</section>
			<ContactFormPage
				variant="primary"
				header={contactForm?.header}
				content={contactForm?.content}
			/>
		</>
	)
}
