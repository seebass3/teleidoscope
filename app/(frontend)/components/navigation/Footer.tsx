import Logo from '@/branding/logo-light.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="bg-flint">
			<div className="container-footer">
				<div className="flex flex-col flex-wrap max-lg:gap-y-2xl lg:flex-row lg:justify-between lg:gap-x-[60px] xl:gap-x-[138px]">
					<div className="flex max-w-[612px] flex-1 flex-col gap-y-[29px] md:gap-y-[24px] lg:max-w-[499px] lg:gap-y-[29px]">
						<Link href="/">
							<Image
								className="inline-block h-auto w-full"
								src={Logo}
								alt="Teleidoscope Logo"
							/>
						</Link>
						<h4 className="text-moss">
							Advanced tracking, targeting, and
							<br />
							antonomy algorithms.
						</h4>
					</div>

					<div className="flex h-full flex-1 flex-col gap-y-2xl md:gap-y-[120px]">
						<div className="flex w-full flex-row gap-x-[20px] gap-y-[40px] text-sand max-md:flex-wrap md:gap-x-[15px] lg:w-auto lg:gap-x-[30px]">
							<div className="md: flex w-full min-w-[167px] flex-1 flex-col gap-5 md:min-w-[211px] lg:min-w-[120px] lg:max-w-[181px]">
								<p className="text-moss">Offerings</p>
								<ul className="flex flex-col gap-5">
									<li>
										<Link
											href="/algorithms"
											className="transition-colors duration-300 hover:text-solar"
										>
											Algorithms
										</Link>
									</li>
									<li>
										<Link
											href="/camera-systems"
											className="transition-colors duration-300 hover:text-solar"
										>
											Camera Systems
										</Link>
									</li>
									<li>
										<Link
											href="/extended-reality-systems"
											className="transition-colors duration-300 hover:text-solar"
										>
											Extended Reality Systems
										</Link>
									</li>
									<li>
										<Link
											href="/endpoint-accuracy-systems"
											className="transition-colors duration-300 hover:text-solar"
										>
											Endpoint Accuracy Systems
										</Link>
									</li>
								</ul>
							</div>
							<div className="flex w-full min-w-[167px] flex-1 flex-col gap-5 md:min-w-[211px] lg:min-w-[120px] lg:max-w-[181px]">
								<p className="text-moss">Teleidoscope</p>
								<ul className="flex flex-col gap-5">
									<li>
										<Link
											href="/company"
											className="transition-colors duration-300 hover:text-solar"
										>
											Company
										</Link>
									</li>
									<li>
										<Link
											href="/news"
											className="transition-colors duration-300 hover:text-solar"
										>
											News & Updates
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="transition-colors duration-300 hover:text-solar"
										>
											Careers
										</Link>
									</li>
								</ul>
							</div>
							<div className="flex w-full min-w-[167px] flex-1 flex-col gap-5 md:min-w-[211px] lg:min-w-[120px] lg:max-w-[181px]">
								<p className="text-moss">Contact</p>
								<ul className="flex flex-col gap-5">
									<li>
										<Link
											href="/contact"
											scroll={false}
											className="transition-colors duration-300 hover:text-solar"
										>
											Get In Touch
										</Link>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/company/teleidoscope/"
											target="_blank"
											rel="noreferrer"
											className="transition-colors duration-300 hover:text-solar"
										>
											LinkedIn
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="flex w-full justify-between text-moss max-md:flex-col max-md:gap-xl">
							<ul className="flex flex-row gap-[30px]">
								<li>
									<Link
										href="/privacy-policy"
										className="transition-colors duration-300 hover:text-sand"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms-of-use"
										className="transition-colors duration-300 hover:text-sand"
									>
										Terms of Use
									</Link>
								</li>
								<li>
									<Link
										href="/gdpr-notice"
										className="transition-colors duration-300 hover:text-sand"
									>
										GDPR Notice
									</Link>
								</li>
							</ul>
							<p className="lg:hidden">
								© {new Date().getFullYear()} Teleidoscope. All rights reserved.
							</p>
						</div>
					</div>

					<div className="hidden w-full text-moss lg:flex">
						<p>
							© {new Date().getFullYear()} Teleidoscope. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
