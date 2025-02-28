import { cn } from '@/app/lib/utils'
import { Post as PostType } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { stegaClean } from 'next-sanity'
import { Image } from 'next-sanity/image'
import Link from 'next/link'
import Corner from '../Corner'

export default function PostCard({
	post,
	index = 0,
}: {
	post: PostType
	index?: number
}) {
	const { _id, title, slug, excerpt, coverImage } = post

	const isLargerImage = index === 0 || index % 6 === 5
	const isEven = index % 2 === 1

	return (
		<div
			key={_id}
			className={cn(
				`flex h-fit flex-col gap-xs border-l border-moss/35 pl-line pr-line text-slate lg:border-l lg:pl-line ${isEven ? 'pr-0 md:border-none md:pl-0 lg:border-solid' : ''}`,
			)}
		>
			{coverImage && (
				<div
					className={`relative w-full overflow-hidden ${isLargerImage ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}
				>
					<Image
						fill={true}
						alt={stegaClean(coverImage?.alt) || ''}
						src={
							urlForImage(coverImage)
								?.width(1280)
								.auto('format')
								.url() as string
						}
						sizes="100vw"
						priority={true}
						draggable={false}
					/>
					<span className="absolute right-0 top-0">
						<Corner variant="white" />
					</span>
				</div>
			)}
			<div className="relative flex flex-col gap-nano">
				<span className="absolute right-0 top-0">
					<Corner variant="solar" />
				</span>
				<h4 className="tracking[-0.4px] pr-[12px] text-md md:pr-[28px]">
					{title}
				</h4>
				<p>{excerpt}</p>
				<Link href={`/news/${slug}`} className="underlined-link">
					Read More
				</Link>
			</div>
		</div>
	)
}
