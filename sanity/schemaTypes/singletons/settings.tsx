import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export default defineType({
	name: 'settings',
	title: 'Settings',
	type: 'document',
	icon: CogIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			description: 'Used for the <meta> description tag for SEO.',
			title: 'Description',
			type: 'text',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'ogImage',
			title: 'Open Graph Image',
			type: 'image',
			description: 'Displayed on social cards and search engine results.',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					description: 'Important for accessibility and SEO.',
					title: 'Alternative text',
					type: 'string',
					validation: (rule) => {
						return rule.custom((alt, context: any) => {
							if (context.document?.ogImage?.asset?._ref && !alt) {
								return 'Required'
							}
							return true
						})
					},
				}),
				defineField({
					name: 'metadataBase',
					type: 'url',
					description: (
						<a
							href="https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase"
							rel="noreferrer noopener"
						>
							More information
						</a>
					),
				}),
			],
		}),
		defineField({
			name: 'contactForm',
			title: 'Modal Contact Form',
			type: 'contactForm',
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Settings',
			}
		},
	},
})
