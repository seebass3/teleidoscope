import { StackIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'useCase',
	title: 'Use Case',
	type: 'object',
	icon: StackIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'sanityImage',
			options: {
				hotspot: true,
			},
			validation: (rule) =>
				rule.custom((value: any) => {
					if (!value || !value?.asset?._ref) {
						return 'Required'
					}
					return true
				}),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'image',
		},
	},
})
