import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'sanityImage',
	title: 'Image',
	type: 'image',
	icon: ImageIcon,
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
				return rule.custom((alt, context: any) => {
					if (context.parent?.asset?._ref && !alt) {
						return 'Required'
					}
					return true
				})
			},
		}),
	],
})
