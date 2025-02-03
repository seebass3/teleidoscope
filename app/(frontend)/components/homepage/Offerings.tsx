import cameraSystems from '@/public/images/camera-systems.jpg'
import Image from 'next/image'
import Link from 'next/link'
import Seperator from '../Seperator'

export default function Offerings() {
	return (
		<section id="offerings" className="relative h-full py-2xl">
			<div className="container flex items-start">
				<div className="flex w-[302px] items-start gap-[15px] self-stretch">
					<Seperator orientation="vertical" variant="moss" />
					<div className="flex flex-col items-start">
						<h3 className="text-moss">Offerings</h3>
					</div>
				</div>
				<div className="grid grid-cols-2 border-l border-moss/35 pl-[15px]">
					<div className="flex flex-col justify-between bg-white pb-sm pl-sm pr-xs pt-md">
						<div className="flex flex-col">
							<h3 className="text-lg tracking-[-0.64] text-solar">01</h3>
							<h3 className="text-lg tracking-[-0.64] text-slate">
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
					<div className="relative aspect-square w-[449px] bg-white">
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
		</section>
	)
}
