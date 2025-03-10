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
			options: {
				collapsible: false,
				hotspot: true,
			},
			hidden: ({ parent }) => {
				return parent?.mediaType !== 'image'
			},
			validation: (rule) => {
				return rule.custom((value, context) => {
					if ((context.parent as any)?.mediaType === 'image' && !value) {
						return 'Image is required'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'video',
			title: 'Video',
			type: 'object',
			options: {
				collapsible: false,
			},
			fields: [
				defineField({
					name: 'source',
					title: 'Source',
					type: 'mux.video',
					options: {
						collapsible: false,
					},
				}),
				defineField({
					name: 'playbackId',
					title: 'Playback ID',
					type: 'string',
					readOnly: true,
					hidden: true,
				}),
			],
			hidden: ({ parent }) => {
				return parent?.mediaType !== 'video'
			},
			validation: (rule) => {
				return rule.custom((value, context) => {
					if ((context.parent as any)?.mediaType === 'video' && !value) {
						return 'Video is required'
					}
					return true
				})
			},
		}),
	],
})
