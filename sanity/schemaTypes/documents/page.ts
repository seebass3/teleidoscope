import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	icon: DocumentIcon,
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'name',
				maxLength: 96,
			},
		}),
		defineField({
			name: 'pageType',
			title: 'Page Type',
			type: 'string',
			options: {
				list: ['offering', 'about', 'legal'],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'legalContent',
			title: 'Legal Content',
			type: 'blockContent',
			hidden: ({ parent }) => parent?.pageType !== 'legal',
		}),
		defineField({
			name: 'inDevelopment',
			title: 'Offering in development',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }) => parent?.pageType !== 'offering',
		}),
		defineField({
			name: 'hero',
			title: 'Hero',
			type: 'media',
			hidden: ({ parent }) => {
				return !(
					parent?.pageType === 'offering' || parent?.pageType === 'about'
				)
			},
		}),
		defineField({
			name: 'heading',
			title: 'Page Heading',
			type: 'text',
			hidden: ({ parent }) => {
				return !(
					parent?.pageType === 'offering' || parent?.pageType === 'about'
				)
			},
		}),
	],
})
