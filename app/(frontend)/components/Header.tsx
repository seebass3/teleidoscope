import Logo from '@/app/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
	return (
		<header className="fixed inset-0 z-50 flex h-24 items-center bg-white/80 backdrop-blur-lg">
			<div className="container py-6 sm:px-6">
				<div className="flex items-center justify-between gap-5">
					<Link className="flex items-center gap-2" href="/">
						<Image
							className="inline-block h-auto w-40"
							src={Logo}
							alt="Teleidoscope Logo"
						/>
					</Link>

					<nav className="">
						<ul
							role="list"
							className="flex items-center gap-4 text-sm font-normal leading-5 tracking-tight md:gap-6 md:text-base"
						>
							<li>
								<Link href="/about" className="">
									Offerings
								</Link>
							</li>
							<li>
								<Link href="/about" className="">
									Company
								</Link>
							</li>
							<li>
								<Link href="/about" className="">
									Updates
								</Link>
							</li>

							<li className="flex before:block sm:gap-4 sm:before:w-[1px] sm:before:bg-gray-100 md:gap-6">
								<Link
									className="flex h-8 w-32 items-center justify-center gap-2 bg-solar p-1 text-white transition-colors duration-200 hover:bg-flint"
									href="https://github.com/sanity-io/sanity-template-nextjs-clean"
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="">Get In touch</span>
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
