'use client'

import Logo from '@/app/logo-dark.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [isMenuOpen])

	const closeMenu = () => setIsMenuOpen(false)

	const navItems = [
		{
			title: 'Offerings',
			href: '',
			subItems: [
				{
					title: 'Algorithms',
					href: '/algorithms',
				},
				{
					title: 'Camera Systems',
					href: '/camera-systems',
				},
				{
					title: 'Extended Reality Systems',
					href: '/extended-reality-systems',
				},
				{
					title: 'Endpoint Accuracy Systems',
					href: '/endpoint-accuracy-systems',
				},
			],
		},
		{
			title: 'Company',
			href: '/company',
		},
		{
			title: 'Updates',
			href: '/updates',
		},
	]

	return (
		<header className="fixed inset-0 z-40 flex h-fit items-center bg-white md:h-header-height">
			<div className="container-header">
				<div className="flex items-center gap-[65px] md:mt-[42px] lg:mt-[44px] lg:justify-between">
					<Link className="flex shrink-0" href="/">
						<Image
							className="inline-block lg:h-[23px] lg:w-[158px]"
							src={Logo}
							alt="Teleidoscope Logo"
						/>
					</Link>

					<div className="xl:w-[922px] flex w-full flex-shrink items-center justify-end lg:justify-between">
						<DesktopNav
							navItems={navItems}
							isOpen={isMenuOpen}
							setIsOpen={setIsMenuOpen}
							onClose={closeMenu}
						/>
						<MobileNav
							navItems={navItems}
							isOpen={isMenuOpen}
							setIsOpen={setIsMenuOpen}
							onClose={closeMenu}
						/>
					</div>
				</div>
			</div>
		</header>
	)
}
