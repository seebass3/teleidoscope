import { Link } from '@/sanity.types'
import { dataset, projectId, studioUrl } from '@/sanity/lib/api'
import createImageUrlBuilder from '@sanity/image-url'
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity'

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
})

export const urlForImage = (source: any) => {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return undefined
	}

	return imageBuilder?.image(source).auto('format').fit('max')
}

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
	if (!image) return
	const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
	if (!url) return
	return { url, alt: image?.alt as string, width, height }
}

export function resolveOpenGraphVideo(
	video: any,
	pageTitle?: string,
	width = 1200,
	height = 627,
) {
	if (!video?.playbackId) return

	const url = `https://image.mux.com/${video.playbackId}/thumbnail.jpg?width=${width}&height=${height}&fit_mode=smartcrop&time=0`

	return {
		url,
		width,
		height,
		alt: pageTitle as string,
	}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
	if (!link) return null

	// If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
	if (!link.linkType && link.href) {
		link.linkType = 'href'
	}

	switch (link.linkType) {
		case 'href':
			return link.href || null
		case 'page':
			if (link?.page && typeof link.page === 'string') {
				return `/${link.page}`
			}
		case 'post':
			if (link?.post && typeof link.post === 'string') {
				return `/news/${link.post}`
			}
		case 'contact':
			return '/contact'

		default:
			return null
	}
}

type DataAttributeConfig = CreateDataAttributeProps &
	Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
	return createDataAttribute({
		projectId,
		dataset,
		baseUrl: studioUrl,
	}).combine(config)
}
