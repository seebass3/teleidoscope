import type { Metadata, ResolvingMetadata } from 'next'
import { type PortableTextBlock } from 'next-sanity'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, postQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import PortableText from '../../components/PortableText'
import { RecentPosts } from '../../components/posts/RecentPosts'

type Props = {
	params: Promise<{ slug: string }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
	const { data } = await sanityFetch({
		query: postPagesSlugs,
		// Use the published perspective in generateStaticParams
		perspective: 'published',
		stega: false,
	})
	return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
	props: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const params = await props.params
	const { data: post } = await sanityFetch({
		query: postQuery,
		params,
		// Metadata should never contain stega
		stega: false,
	})
	const previousImages = (await parent).openGraph?.images || []
	const ogImage = resolveOpenGraphImage(post?.coverImage)

	return {
		authors:
			post?.author?.firstName && post?.author?.lastName
				? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
				: [],
		title: post?.title,
		description: post?.excerpt,
		openGraph: {
			images: ogImage ? [ogImage, ...previousImages] : previousImages,
		},
	} satisfies Metadata
}

export default async function PostPage(props: Props) {
	const params = await props.params
	const [{ data: post }] = await Promise.all([
		sanityFetch({ query: postQuery, params }),
	])

	if (!post?._id) {
		return notFound()
	}

	return (
		<>
			<div className="">
				<div className="container my-12 grid gap-12 lg:my-24">
					<div>
						<div className="border-gray-100 mb-6 grid gap-6 border-b pb-6">
							<div className="flex max-w-3xl flex-col gap-6">
								<h2 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl font-bold tracking-tight">
									{post.title}
								</h2>
							</div>
						</div>
						<article className="grid max-w-4xl gap-6">
							{post.content?.length && (
								<PortableText
									className="max-w-2xl"
									value={post.content as PortableTextBlock[]}
								/>
							)}
						</article>
					</div>
				</div>
			</div>
			<div className="border-gray-100 border-t">
				<div className="container my-12 grid gap-12 lg:my-24">
					<aside>
						<Suspense>
							{await RecentPosts({ skip: post._id, limit: 2 })}
						</Suspense>
					</aside>
				</div>
			</div>
		</>
	)
}
