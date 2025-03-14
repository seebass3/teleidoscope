import { cn } from '@/app/lib/utils'
import { Page as PageType, SanityImage } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { Image } from 'next-sanity/image'
import { Suspense } from 'react'
import Button from '../Button'
import { ContactFormPage } from '../contact/ContactFormPage'
import Corner from '../Corner'
import { RecentPosts } from '../posts/RecentPosts'
import ResolvedLink from '../ResolvedLink'
import Seperator from '../Seperator'
import Hero from './Hero'
import ImageCarousel from './ImageCarousel'

export default async function AboutLayout({ page }: { page: PageType }) {
	const { title, hero, heading, expertise, careers, process, contactForm } =
		page
	return (
		<>
			<div className="container pt-[160px] lg:pt-[200px]">
				<h1 className="mb-sm pl-line text-slate">{title}</h1>
			</div>
			<Hero hero={hero} />
			{heading && (
				<div className="container pt-xl">
					<div className="flex justify-center lg:justify-start xl:justify-end">
						<div className="flex justify-between gap-x-micro border-l border-moss/35 pl-line lg:ml-[223px] lg:w-[816px] xl:w-[937px]">
							<div className="w-full max-w-[816px] space-y-8">
								{page.heading &&
									page.heading.map((heading) => (
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
			<section id="expertise" className="py-2xl">
				<div className="container">
					<div className="flex w-full justify-between gap-y-sm border-l border-moss/35 pl-line max-lg:flex-col">
						<div className="lg:min-w-[206px]">
							<h3 className="text-moss">Our Expertise</h3>
						</div>

						<div className="grid grid-cols-1 gap-y-line md:grid-cols-2 lg:w-[937px]">
							{expertise?.map((expertiseItem, index) => {
								const expertiseLength = expertise.length || 0

								const isLastAndOdd =
									(index === expertiseLength - 1 &&
										expertiseLength % 2 !== 0) ||
									expertiseLength === 1

								const isFirstColumn = index % 2 === 0

								return (
									<div
										key={index}
										className={cn(
											'flex w-full flex-row',
											isLastAndOdd ? 'md:col-span-2' : '',
											isFirstColumn
												? 'lg:border-l lg:border-moss/35 lg:pl-line'
												: 'md:pl-line',
										)}
									>
										<div
											className={cn(
												'clip-path flex w-full flex-col gap-y-xl bg-white px-sm pb-sm pt-md md:gap-y-lg',
												isLastAndOdd
													? 'grid grid-cols-1 gap-x-line md:grid-cols-2'
													: '',
											)}
										>
											<div className="flex w-full">
												<h3 className="text-sand">0{index + 1}</h3>
											</div>
											<div
												className={cn(
													'flex flex-col gap-y-2 text-slate',
													isLastAndOdd
														? 'md:pl-[calc(var(--spacing-sm)+7.5px)] lg:pl-sm'
														: '',
												)}
											>
												<h4 className="">{expertiseItem.title}</h4>
												<p className="text-body">{expertiseItem.description}</p>
												{expertiseItem.button?.buttonText &&
													expertiseItem.button.link && (
														<ResolvedLink link={expertiseItem.button.link}>
															<Button
																variant="dashed"
																size="custom"
																className="mb-nano mt-micro md:w-fit"
															>
																{expertiseItem.button.buttonText}
															</Button>
														</ResolvedLink>
													)}
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>
			<section className="bg-flint py-2xl">
				<div className="container">
					<div className="flex flex-col gap-y-xl lg:flex-row lg:border-l lg:border-sand/35 lg:pl-line">
						<div className="flex basis-1/2 flex-col gap-y-sm max-lg:border-l max-lg:border-sand/35 max-lg:pl-line lg:pr-line">
							<div className="flex justify-between">
								<h1 className="text-sand">{careers?.heading}</h1>
								<Corner />
							</div>
							<div className="flex flex-col gap-y-micro">
								<p className="text-sand md:max-w-[438px] lg:max-w-[393px]">
									{careers?.content}
								</p>
								{careers?.button?.buttonText && careers.button.link && (
									<ResolvedLink link={careers.button.link}>
										<Button
											variant="outlineLight"
											size="custom"
											className="md:w-[211px] lg:w-[182px]"
										>
											{careers.button.buttonText}
										</Button>
									</ResolvedLink>
								)}
							</div>
						</div>
						<div className="clip-path flex w-full basis-1/2 flex-col gap-y-nano pl-line">
							<ImageCarousel images={careers?.imageCarousel as SanityImage[]} />
						</div>
					</div>
				</div>
			</section>
			<section id="process" className="pt-2xl">
				<div className="container">
					<div className="flex w-full justify-between gap-y-sm border-l border-moss/35 pl-line max-lg:flex-col">
						<div className="lg:min-w-[206px]">
							<h3 className="text-moss">Our Process</h3>
						</div>

						<div className="flex flex-col gap-y-line lg:w-[937px]">
							{process?.map((processItem, index) => (
								<div
									key={index}
									className="flex flex-col lg:border-l lg:border-moss/35 lg:pl-line"
								>
									<div className="flex w-full flex-col gap-lg bg-white px-md py-lg">
										<div className="flex flex-col gap-nano">
											<div className="flex w-[40px] justify-start">
												{processItem.icon && processItem.icon.asset && (
													<Image
														src={urlForImage(processItem.icon)?.url() || ''}
														alt={processItem.title || 'Process icon'}
														width={40}
														height={40}
													/>
												)}
											</div>
											<h3 className="text-slate">{processItem.title}</h3>
										</div>
										<div className="flex flex-col justify-between gap-x-[40px] gap-y-md md:flex-row">
											<div className="flex flex-col gap-y-6 md:basis-1/2 lg:basis-[45.5%]">
												{processItem.description.map((description, index) => (
													<p key={index}>{description.text}</p>
												))}
											</div>

											<div className="flex-shrink-0 self-stretch md:hidden">
												<Seperator orientation="horizontal" variant="moss" />
											</div>
											<div className="flex flex-col items-start justify-start font-mono text-micro uppercase text-moss max-md:gap-y-md md:basis-1/2 md:gap-y-4 md:border-l md:border-moss/35 md:pl-line lg:basis-[42%]">
												{processItem.highlights.map((highlight, index) => (
													<p key={index}>{highlight}</p>
												))}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<Suspense>{await RecentPosts({ limit: 2 })}</Suspense>
			<ContactFormPage
				variant="secondary"
				header={contactForm?.header}
				content={contactForm?.content}
			/>
		</>
	)
}
