import cameraSystems from '@/public/images/camera-systems.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Seperator from '../Seperator'

export default function Offerings() {
	return (
		<section id="offerings" className="relative h-full py-2xl">
			<div className="container">
				<div className="flex w-full items-start justify-between">
					<div className="flex flex-shrink items-start gap-[15px] self-stretch">
						<Seperator orientation="vertical" variant="moss" />
						<div className="flex flex-col items-start">
							<h3 className="xl:mr-[95.2px] text-lg tracking-[-0.64px] text-moss lg:mr-[111.7px]">
								Offerings
							</h3>
						</div>
					</div>
					<div className="flex w-[922px] self-stretch">
						<div className="flex aspect-square basis-1/2 flex-col justify-between bg-white px-sm pb-sm pt-md">
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
									className="flex w-[210px] justify-center border border-slate px-2 py-3 font-mono text-micro uppercase text-slate"
									href="/algorithms"
								>
									Learn More
								</Link>
							</div>
						</div>
						<div className="relative aspect-square basis-1/2 bg-white">
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
