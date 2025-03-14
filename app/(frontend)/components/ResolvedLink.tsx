import { Link as LinkType } from '@/sanity.types'
import Link from 'next/link'

import { linkResolver } from '@/sanity/lib/utils'

export default function ResolvedLink({
	link,
	children,
	className,
}: {
	link: LinkType
	children: React.ReactNode
	className?: string
}) {
	// resolveLink() is used to determine the type of link and return the appropriate URL.
	const resolvedLink = linkResolver(link)

	if (typeof resolvedLink === 'string') {
		return (
			<Link
				href={resolvedLink}
				target={link?.openInNewTab ? '_blank' : undefined}
				rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
				className={className}
				scroll={link?.linkType === 'contact' ? false : true}
			>
				{children}
			</Link>
		)
	}
	return <>{children}</>
}
