import { Page } from '@/sanity.types'
import { type PortableTextBlock } from 'next-sanity'
import DateComponent from '../Date'
import PortableText from '../PortableText'

interface LegalLayoutProps {
	page: Page
}

export default function LegalLayout({ page }: LegalLayoutProps) {
	return (
		<section id="legal-content" className="pb-2xl pt-[200px]">
			<div className="container">
				<h1 className="mb-xl pl-line text-slate">{page.name}</h1>
				<div className="flex w-full items-start justify-between border-l border-moss/35 pl-line max-lg:flex-col max-lg:gap-xl">
					<div className="lg:min-w-[206px]">
						{page._updatedAt && (
							<div className="text-micro uppercase text-moss">
								<p className="mb-0.5">Last updated:</p>
								<DateComponent dateString={page._updatedAt} />
							</div>
						)}
					</div>
					{page.legalContent && (
						<PortableText
							value={page.legalContent as PortableTextBlock[]}
							className="max-w-[937px] lg:border-l lg:border-moss/35 lg:pl-line lg:pr-[106px]"
						/>
					)}
				</div>
			</div>
		</section>
	)
}
