import { sanityFetch } from '@/sanity/lib/live'
import { recentPostsQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import PostCard from './PostCard'

export const RecentPosts = async ({
	skip = null,
	limit,
}: {
	skip?: string | null
	limit: number
	heading?: string
	subHeading?: string
}) => {
	const { data } = await sanityFetch({
		query: recentPostsQuery,
		params: { skip, limit },
	})

	if (!data || data.length === 0) {
		return null
	}

	return (
		<section id="latest-updates" className="py-2xl">
			<div className="container">
				<div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-y-lg lg:border-l lg:border-moss/35 lg:pl-line">
					<div className="flex flex-col gap-sm max-lg:border-l max-lg:border-moss/35 max-lg:pl-line lg:min-w-[206px]">
						<h3 className="text-moss">Latest Updates</h3>
						<Link href="news" className="underlined-link">
							See All News &#38; Updates
						</Link>
					</div>
					<div className="flex w-full flex-col max-md:gap-xl md:flex-row lg:w-[937px]">
						{data.map((post: any, index: number) => {
							const isEven = index % 2 === 0

							return (
								<PostCard
									key={post._id}
									post={post}
									isLargerImage={isEven}
									className={`border-l border-moss/35 pl-line ${
										isEven
											? 'w-full lg:border-l lg:pl-line lg:pr-line'
											: 'w-full pl-line pr-0 md:border-none lg:border-l lg:border-solid'
									}`}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
