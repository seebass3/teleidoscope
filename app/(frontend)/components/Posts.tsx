import Link from 'next/link'

import { Post as PostType } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { allPostsQuery, morePostsQuery } from '@/sanity/lib/queries'
import DateComponent from './Date'

const Post = ({ post }: { post: PostType }) => {
	const { _id, title, slug, excerpt, date } = post

	return (
		<article
			key={_id}
			className="flex max-w-xl flex-col items-start justify-between"
		>
			<div className="text-sm text-gray-500">
				<DateComponent dateString={date} />
			</div>

			<h3 className="mt-3 text-2xl font-semibold">
				<Link
					className="underline transition-colors hover:text-red-500"
					href={`/posts/${slug}`}
				>
					{title}
				</Link>
			</h3>
			<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
				{excerpt}
			</p>
		</article>
	)
}

const Posts = ({
	children,
	heading,
	subHeading,
}: {
	children: React.ReactNode
	heading?: string
	subHeading?: string
}) => (
	<div>
		{heading && (
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
				{heading}
			</h2>
		)}
		{subHeading && (
			<p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>
		)}
		<div className="mt-6 space-y-12 border-t border-gray-200 pt-6">
			{children}
		</div>
	</div>
)

export const MorePosts = async ({
	skip,
	limit,
}: {
	skip: string
	limit: number
}) => {
	const { data } = await sanityFetch({
		query: morePostsQuery,
		params: { skip, limit },
	})

	if (!data || data.length === 0) {
		return null
	}

	return (
		<Posts heading={`Recent Posts (${data?.length})`}>
			{data?.map((post: any) => <Post key={post._id} post={post} />)}
		</Posts>
	)
}

export const AllPosts = async () => {
	const { data } = await sanityFetch({ query: allPostsQuery })

	if (!data || data.length === 0) {
		return null
	}

	return (
		<Posts
			heading="Recent Posts"
			subHeading={`${data.length === 1 ? 'This blog post is' : `These ${data.length} blog posts are`} populated from your Sanity Studio.`}
		>
			{data.map((post: any) => (
				<Post key={post._id} post={post} />
			))}
		</Posts>
	)
}
