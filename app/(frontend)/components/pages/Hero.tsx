import { Media } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/utils'
import { Image } from 'next-sanity/image'
import BackgroundPlayer from 'next-video/background-player'
import InDevelopment from '../InDevelopment'

const MUX_BASE_VIDEO_URL = 'https://stream.mux.com/'
const MUX_BASE_IMAGE_URL = 'https://image.mux.com/'

export default function Hero({
	hero,
	inDevelopment,
}: {
	hero?: Media
	inDevelopment?: boolean
}) {
	return (
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
						alt={hero.image.alt || 'Hero Image'}
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
				</div>
			)}
			{inDevelopment && <InDevelopment />}
		</div>
	)
}
