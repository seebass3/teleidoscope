import { cn } from '@/app/lib/utils'
import { Post as PostType } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { stegaClean } from 'next-sanity'
import { Image } from 'next-sanity/image'
import Link from 'next/link'
import Corner from '../Corner'

export default function PostCard({
	post,
	isLargerImage = false,
	className,
}: {
	post: PostType
	isLargerImage?: boolean
	className?: string
}) {
	const { _id, title, slug, excerpt, coverImage } = post

	return (
		<div
			key={_id}
			className={cn('flex h-fit flex-col gap-xs text-slate', className)}
		>
			{coverImage && (
				<div
					className={cn(
						'clip-path relative h-full w-full overflow-hidden',
						isLargerImage ? 'aspect-[4/3]' : 'aspect-[3/2]',
					)}
				>
					<Image
						className="object-cover"
						fill={true}
						alt={stegaClean(coverImage?.alt) || ''}
						src={
							urlForImage(coverImage)
								?.width(1280)
								.auto('format')
								.url() as string
						}
						sizes="(max-width: 768px) 100vw, 50vw"
						priority={true}
						draggable={false}
					/>
				</div>
			)}
			<div className="relative flex flex-col gap-nano">
				<h4 className="tracking[-0.4px] pr-[12px] text-md md:pr-[28px]">
					{title}
				</h4>
				<span className="absolute right-0 top-0">
					<Corner variant="solar" />
				</span>
				<p>{excerpt}</p>
				<Link href={`/news/${slug}`} className="underlined-link">
					Read More
				</Link>
			</div>
		</div>
	)
}
