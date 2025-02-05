import Logo from '@/app/logo-dark.svg'
import Image from 'next/image'
import Link from 'next/link'
import DesktopNav from './DesktopNav'

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
			href: '/updates',
		},
	]

	return (
		<header className="fixed inset-0 z-40 flex h-header-height items-center bg-white">
			<div className="container-nav">
				<div className="flex items-center gap-[90px]">
					<Link className="flex shrink-0" href="/">
						<Image
							className="inline-block"
							src={Logo}
							alt="Teleidoscope Logo"
						/>
					</Link>

					<nav className="flex w-full flex-shrink justify-between">
						<DesktopNav navItems={navItems} />
					</nav>
				</div>
			</div>
		</header>
	)
}
