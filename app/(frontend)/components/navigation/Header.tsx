'use client'

import Badge from '@/app/badge-dark.svg'
import Logo from '@/app/logo-dark.svg'
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
			href: '/company',
		},
		{
			title: 'Updates',
			href: '/news',
		},
	]

	return (
		<header className="fixed inset-0 z-40 flex h-fit items-center bg-white md:h-header-height">
			<div className="container-header">
				<DesktopNav navItems={navItems} logo={Logo} />
				<MobileNav navItems={navItems} logo={Logo} badge={Badge} />
			</div>
		</header>
	)
}
