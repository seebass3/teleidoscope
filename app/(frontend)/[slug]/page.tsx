import type { Metadata } from 'next'

import AboutLayout from '@/app/(frontend)/components/pages/AboutLayout'
import LegalLayout from '@/app/(frontend)/components/pages/LegalLayout'
import OfferingLayout from '@/app/(frontend)/components/pages/OfferingLayout'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, pagesSlugs, settingsQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'

type Props = {
	params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: pagesSlugs,
		// // Use the published perspective in generateStaticParams
		perspective: 'published',
		stega: false,
	})
	return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params

	const [{ data: page }, { data: settings }] = await Promise.all([
		sanityFetch({
			query: getPageQuery,
			params,
			stega: false,
		}),
		sanityFetch({
			query: settingsQuery,
			stega: false,
		}),
	])

	const description =
		page?.heading && page.heading.length > 0
			? page.heading.map((block: any) => block.text).join(' ')
			: settings?.description ||
				'State of the art tracking software and systems.'

	return {
		title: page?.name,
		description: description,
	} satisfies Metadata
}

export default async function Page(props: Props) {
	const params = await props.params
	const [{ data: page }] = await Promise.all([
		sanityFetch({ query: getPageQuery, params }),
	])

	if (!page?._id) {
		return notFound()
	}

	switch (page.pageType) {
		case 'offering':
			return <OfferingLayout page={page as any} />
		case 'about':
			return <AboutLayout page={page as any} />
		case 'legal':
			return <LegalLayout page={page as any} />
	}
}
