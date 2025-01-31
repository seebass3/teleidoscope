import { type PortableTextBlock } from 'next-sanity'

import { InfoSection } from '@/sanity.types'
import PortableText from './PortableText'

type InfoProps = {
	block: InfoSection
	index: number
}

export default function CTA({ block }: InfoProps) {
	return (
		<div className="container my-12">
			<div className="max-w-3xl">
				{block?.heading && (
					<h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
						{block.heading}
					</h2>
				)}
				{block?.subheading && (
					<span className="mb-8 mt-4 block text-lg font-light uppercase text-gray-900/70">
						{block.subheading}
					</span>
				)}
				<div className="prose mt-4 prose-a:text-red-500">
					{block?.content?.length && (
						<PortableText
							className=""
							value={block.content as PortableTextBlock[]}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
