import Icon1 from '@/branding/icon-1.svg'
import Icon2 from '@/branding/icon-2.svg'
import Icon3 from '@/branding/icon-3.svg'
import Image from 'next/image'
import Link from 'next/link'
import Corner from '../Corner'

export default function Process() {
	return (
		<section id="process" className="py-2xl">
			<div className="container">
				<div className="flex flex-col gap-y-md lg:flex-row lg:border-l lg:border-moss/35 lg:pl-line">
					<div className="flex basis-1/2 flex-col gap-y-sm max-lg:border-l max-lg:border-moss/35 max-lg:pl-line lg:pr-[15px]">
						<div className="flex items-start justify-between">
							<h1 className="text-slate">How We Work</h1>
							<Corner />
						</div>
						<div className="flex flex-col gap-y-micro">
							<p className="text-flint md:max-w-[551px] lg:max-w-[393px]">
								Modular, iterative approach at the speed of thought, all with a
								user-centric mindset. Our agile methodology allows us to swiftly
								develop and refine cutting-edge software solutions, continuously
								adapting to evolving needs.
							</p>
							<Link href="/about" className="underlined-link">
								About our Process
							</Link>
						</div>
					</div>
					<div className="flex w-full basis-1/2 flex-col gap-y-[15px]">
						{/* Rapid concept to prototype */}
						<div className="border-l border-moss/35 pl-line">
							<div className="flex w-full flex-col items-center gap-lg bg-white p-[30px] sm:flex-row md:p-10">
								<div className="flex w-full justify-start sm:w-[151px] sm:justify-center">
									<Image src={Icon1} alt="Rapid Concept to Prototype" />
								</div>
								<div className="flex flex-col gap-2">
									<h4>Rapid concept to prototype</h4>
									<p className="text-slate">
										Justo a a lacus elementum. Scelerisque faucibus iaculis id
										in erat vestibulum aliquam mi risus cras.
									</p>
								</div>
							</div>
						</div>
						{/* Modular approach */}
						<div className="border-l border-moss/35 pl-line">
							<div className="flex w-full flex-col items-center gap-lg bg-white p-[30px] sm:flex-row md:p-10">
								<div className="flex w-full justify-start sm:w-[151px] sm:justify-center">
									<Image src={Icon2} alt="Rapid Concept to Prototype" />
								</div>
								<div className="flex flex-col gap-2">
									<h4>Modular approach</h4>
									<p className="text-slate">
										Accumsan fringilla nunc convallis ut aenean sit lorem
										mollis. Ornare elit neque proin varius.
									</p>
								</div>
							</div>
						</div>
						{/* Nimble team */}
						<div className="border-l border-moss/35 pl-line">
							<div className="flex w-full flex-col items-center gap-lg bg-white p-[30px] sm:flex-row md:p-10">
								<div className="flex w-full justify-start sm:w-[151px] sm:justify-center">
									<Image src={Icon3} alt="Rapid Concept to Prototype" />
								</div>
								<div className="flex flex-col gap-2">
									<h4>Nimble, dedicated team</h4>
									<p className="text-slate">
										Cras quisque lectus sit auctor risus ultrices. Metus
										habitasse maecenas accumsan tristique integer.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
