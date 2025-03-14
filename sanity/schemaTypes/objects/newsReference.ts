import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'newsReference',
	title: 'News reference',
	type: 'object',
	fields: [
		defineField({
			name: 'active',
			title: 'Active',
			type: 'boolean',
			initialValue: false,
			description: 'Show the "In the news" section on the page.',
		}),
		defineField({
			name: 'heading',
			title: 'Heading',
			type: 'string',
			hidden: ({ parent }) => !parent?.active,
			validation: (rule) => {
				return rule.custom((value, context: any) => {
					if (context.parent?.active && !value) {
						return 'Required'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'sanityImage',
			hidden: ({ parent }) => !parent?.active,
			validation: (rule) => {
				return rule.custom((value, context: any) => {
					if (context.parent?.active && !value) {
						return 'Required'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			hidden: ({ parent }) => !parent?.active,
			validation: (rule) => {
				return rule.custom((value, context: any) => {
					if (context.parent?.active && !value) {
						return 'Required'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'source',
			title: 'Source',
			type: 'string',
			description:
				'The name of the publication or website. Will be added to the "Read More" button.',
			hidden: ({ parent }) => !parent?.active,
			validation: (rule) => {
				return rule.custom((value, context: any) => {
					if (context.parent?.active && !value) {
						return 'Required'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'url',
			title: 'URL',
			type: 'url',
			hidden: ({ parent }) => !parent?.active,
			validation: (rule) => {
				return rule.custom((value, context: any) => {
					if (context.parent?.active && !value) {
						return 'Required'
					}
					return true
				})
			},
		}),
	],
})
