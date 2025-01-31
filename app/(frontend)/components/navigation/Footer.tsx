import Logo from '@/app/logo-light.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="bg-flint">
			<div className="container">
				<div className="flex flex-col items-center justify-center py-28 lg:flex-row">
					<div className="flex flex-col items-start">
						<Image
							className="inline-block h-auto w-96 pb-5"
							src={Logo}
							alt="Teleidoscope Logo"
						/>
						<p className="w-2/3 text-moss">
							Advanced tracking, targeting, and antonomy algorithms.
						</p>
					</div>
					<div className="flex flex-row gap-5">
						<div className="flex flex-row">
							<ul className="flex flex-col gap-4">
								<li>
									<Link className="text-sandstone" href="/about">
										Offerings
									</Link>
								</li>
								<li>
									<Link className="text-sandstone" href="/about">
										Company
									</Link>
								</li>
								<li>
									<Link className="text-sandstone" href="/about">
										Updates
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex flex-row">
							<ul className="flex flex-col gap-4">
								<li>
									<Link className="text-sandstone" href="/about">
										Offerings
									</Link>
								</li>
								<li>
									<Link className="text-sandstone" href="/about">
										Company
									</Link>
								</li>
								<li>
									<Link className="text-sandstone" href="/about">
										Updates
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex flex-row">
							<ul className="flex flex-col gap-4">
								<li>
									<Link className="text-sandstone" href="/about">
										Offerings
									</Link>
								</li>
								<li>
									<Link className="text-sandstone" href="/about">
										Company
									</Link>
								</li>
								<li>
									<Link className="text-sandstone" href="/about">
										Updates
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
