import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'media',
	title: 'Media',
	type: 'object',
	fields: [
		defineField({
			name: 'mediaType',
			title: 'Media Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Image', value: 'image' },
					{ title: 'Video', value: 'video' },
				],
				layout: 'radio',
			},
			initialValue: 'image',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'sanityImage',
			hidden: ({ parent }) => {
				return parent?.mediaType !== 'image'
			},
		}),
		defineField({
			name: 'video',
			title: 'Video',
			type: 'mux.video',
			hidden: ({ parent }) => {
				return parent?.mediaType !== 'video'
			},
		}),
	],
	preview: {
		select: {
			media: 'image',
			mediaType: 'mediaType',
		},
		prepare({ media, mediaType }) {
			return {
				title: `Media type (${mediaType || 'image'})`,
				media: media,
			}
		},
	},
})
