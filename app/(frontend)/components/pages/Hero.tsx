import { Media } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { Image } from 'next-sanity/image'
import BackgroundPlayer from 'next-video/background-player'
import Corner from '../Corner'
import InDevelopment from '../InDevelopment'

interface HeroProps {
	title: string
	hero?: Media
	heading?: Array<{
		text?: string
		_type: 'textBlock'
		_key: string
	}>
	inDevelopment?: boolean
}

const MUX_BASE_VIDEO_URL = 'https://stream.mux.com/'
const MUX_BASE_IMAGE_URL = 'https://image.mux.com/'

export default function Hero({
	title,
	hero,
	heading,
	inDevelopment,
}: HeroProps) {
	return (
		<section id="hero">
			<div className="container pt-[160px] lg:pt-[200px]">
				<h1 className="mb-sm pl-line text-slate">{title}</h1>
			</div>
			<div className="relative h-[221px] md:h-[310px] lg:h-[600px]">
				{hero?.mediaType === 'video' && hero.video?.playbackId && (
					<BackgroundPlayer
						playbackId={hero.video.playbackId}
						src={`${MUX_BASE_VIDEO_URL}${hero.video.playbackId}.m3u8`}
						poster={`${MUX_BASE_IMAGE_URL}${hero.video.playbackId}/thumbnail.jpg?time=0`}
						className="absolute inset-0 h-full w-full overflow-hidden"
						style={{
							'--media-object-fit': 'cover',
						}}
					/>
				)}

				{hero?.mediaType === 'image' && hero.image && (
					<div className="absolute inset-0">
						<Image
							src={
								urlForImage(hero.image)
									?.width(1920)
									.auto('format')
									.url() as string
							}
							alt={hero.image.alt || title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}
				{inDevelopment && <InDevelopment />}
			</div>

			<div className="container pt-xl">
				<div className="flex justify-center lg:justify-start xl:justify-end">
					<div className="flex justify-between gap-x-micro border-l border-moss/35 pl-line lg:ml-[223px] lg:w-[816px] xl:w-[937px]">
						<div className="w-full max-w-[816px] space-y-8">
							{heading &&
								heading.map((heading) => (
									<h3 key={heading._key} className="text-slate">
										{heading.text}
									</h3>
								))}
						</div>
						<Corner variant="solar" />
					</div>
				</div>
			</div>
		</section>
	)
}
