import { BlockElementIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'expertise',
	title: 'Expertise',
	type: 'object',
	icon: BlockElementIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'button',
			title: 'Button',
			type: 'callToAction',
			description: 'Leave fields blank if no button is needed.',
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
})
