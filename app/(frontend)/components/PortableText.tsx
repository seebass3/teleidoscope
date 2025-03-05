import {
	PortableText,
	type PortableTextBlock,
	type PortableTextComponents,
} from 'next-sanity'

import { cn } from '@/app/lib/utils'
import ResolvedLink from './ResolvedLink'

export default function CustomPortableText({
	className,
	value,
}: {
	className?: string
	value: PortableTextBlock[]
}) {
	const components: PortableTextComponents = {
		block: {
			h1: ({ children }) => <h1 className="text-slate">{children}</h1>,
			h2: ({ children }) => <h2 className="text-slate">{children}</h2>,
			h3: ({ children }) => <h3 className="text-slate">{children}</h3>,
			h4: ({ children }) => <h4 className="text-slate">{children}</h4>,
			normal: ({ children, value }) => {
				const isEmpty = !value.children?.some((child: any) =>
					child.text?.trim(),
				)

				if (isEmpty) {
					return <div className="h-[1px]"></div>
				}

				return <p>{children}</p>
			},
		},
		marks: {
			link: ({ children, value: link }) => {
				return <ResolvedLink link={link}>{children}</ResolvedLink>
			},
		},
	}

	return (
		<div className={cn(className, 'space-y-8')}>
			<PortableText components={components} value={value} />
		</div>
	)
}
