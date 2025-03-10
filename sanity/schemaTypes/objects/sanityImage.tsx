import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'sanityImage',
	title: 'Image',
	type: 'image',
	options: {
		hotspot: true,
	},
	fields: [
		defineField({
			name: 'alt',
			type: 'string',
			title: 'Alternative text',
			description: 'Important for SEO and accessibility.',
			validation: (rule) => {
				// Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
				return rule.custom((alt, context) => {
					if ((context.parent as any)?.asset?._ref && !alt) {
						return 'Required'
					}
					return true
				})
			},
		}),
	],
})
