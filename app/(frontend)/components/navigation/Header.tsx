'use client'

import Badge from '@/branding/badge-dark.svg'
import Logo from '@/branding/logo-dark.svg'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Header() {
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
			href: '/about',
		},
		{
			title: 'Updates',
			href: '/news',
		},
	]

	return (
		<header className="fixed inset-0 z-40 flex h-fit h-header-height items-center bg-white">
			<div className="container-header">
				<DesktopNav navItems={navItems} logo={Logo} />
				<MobileNav navItems={navItems} logo={Logo} badge={Badge} />
			</div>
		</header>
	)
}
