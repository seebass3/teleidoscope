import { ImageIcon, ListIcon, VideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'feature',
	title: 'Feature',
	type: 'object',
	icon: ListIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			title: 'Description',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'media',
			type: 'media',
			title: 'Media',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			image: 'media.image',
			videoPlaybackId: 'media.video.source.asset.playbackId',
			mediaType: 'media.mediaType',
		},
		prepare({ title, subtitle, image, videoPlaybackId, mediaType }) {
			const hasValidPlaybackId = videoPlaybackId && videoPlaybackId !== ''
			let videoPreview = null

			if (hasValidPlaybackId) {
				const url = `https://image.mux.com/${videoPlaybackId}/thumbnail.jpg?width=200&height=200&fit_mode=smartcrop&time=0`
				videoPreview = <img src={url} />
			}

			let media

			if (mediaType === 'video') {
				media = videoPreview || VideoIcon
			} else if (mediaType === 'image') {
				media = image || ImageIcon
			} else {
				media = ListIcon
			}

			return {
				title: title,
				subtitle: subtitle,
				media: media,
			}
		},
	},
})
