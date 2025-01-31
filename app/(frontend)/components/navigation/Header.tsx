'use client'

import Logo from '@/app/logo-dark.svg'
import Image from 'next/image'
import Link from 'next/link'
import DesktopNav from './DesktopNav'

export default function Header() {
	return (
		<header className="fixed inset-0 z-40 flex h-header-height items-center bg-white">
			<div className="container flex h-full w-full justify-center py-6 sm:px-6">
				<div className="flex items-center justify-between gap-5">
					<Link className="flex items-center gap-2" href="/">
						<Image
							className="inline-block h-auto w-40"
							src={Logo}
							alt="Teleidoscope Logo"
						/>
					</Link>

					<nav>
						<DesktopNav />
					</nav>
				</div>
			</div>
		</header>
	)
}
