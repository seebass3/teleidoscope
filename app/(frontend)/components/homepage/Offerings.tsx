import cameraSystems from '@/public/images/camera-systems.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default function Offerings() {
	return (
		<section id="offerings" className="relative h-full py-2xl">
			<div className="container">
				<div className="flex w-full items-start justify-between border-l border-moss/35 pl-line max-lg:flex-col">
					<div className="flex flex-shrink items-start self-stretch">
						<div className="flex flex-col items-start lg:w-[206.15px]">
							<h3 className="text-lg tracking-[-0.64px] text-moss max-lg:pb-[32px] max-sm:pb-[20px]">
								Offerings
							</h3>
						</div>
					</div>
					<div className="flex w-full self-stretch max-sm:flex-col lg:w-[937px] lg:border-l lg:border-moss/35 lg:pl-line">
						<div className="flex basis-1/2 flex-col justify-between bg-white px-sm pb-sm pt-md max-sm:order-2 sm:aspect-square">
							<div className="flex flex-col">
								<h3 className="text-lg tracking-[-0.64px] text-solar">01</h3>
								<h3 className="text-lg tracking-[-0.64px] text-slate">
									Algorithms
								</h3>
							</div>
							<div className="flex flex-col">
								<p className="pb-nano text-sm text-slate">
									Our algorithms are designed to be the most accurate and
									efficient in the industry.
								</p>
								<Link
									className="flex w-[210px] justify-center border border-slate px-2 py-3 font-action text-micro uppercase text-slate"
									href="/algorithms"
								>
									Learn More
								</Link>
							</div>
						</div>
						<div className="relative min-h-[264px] basis-1/2 bg-white max-sm:order-1 sm:aspect-square">
							<Image
								className="object-cover"
								alt="Algorithms"
								src={cameraSystems}
								fill
								sizes="(min-width: 461px) 50vw, 100vw"
								quality={100}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
