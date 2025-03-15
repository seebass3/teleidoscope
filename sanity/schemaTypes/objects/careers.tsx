import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'careers',
	title: 'Careers',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (context.document?.pageType === 'about' && !value) {
						return 'Required'
					}
					return true
				}),
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'text',
			rows: 5,
			validation: (rule) =>
				rule.custom((value, context) => {
					if (context.document?.pageType === 'about' && !value) {
						return 'Required'
					}
					return true
				}),
		}),
		defineField({
			name: 'button',
			title: 'Button',
			type: 'callToAction',
			options: {
				collapsible: true,
				collapsed: true,
			},
			description: 'Leave fields blank if no button is needed.',
		}),
		defineField({
			name: 'imageCarousel',
			title: 'Image Carousel',
			type: 'array',
			of: [
				{
					type: 'sanityImage',
				},
			],
			validation: (rule) =>
				rule.custom((value, context) => {
					if (
						context.document?.pageType === 'about' &&
						(!value || value.length === 0)
					) {
						return 'At least one carousel image required'
					}
					return true
				}),
		}),
	],
})
