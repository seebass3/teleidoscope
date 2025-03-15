import { DocumentTextIcon, TextIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
	name: 'post',
	title: 'Post',
	icon: DocumentTextIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'A slug is required for the post to show up in the preview',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'heading',
			title: 'Page heading',
			description:
				'Add text blocks that will appear as separate headings with space between them at the top of the page.',
			type: 'array',
			of: [
				{
					name: 'textBlock',
					title: 'Text Block',
					type: 'object',
					icon: TextIcon,
					fields: [
						{
							name: 'text',
							type: 'text',
							title: 'Text',
							rows: 3,
						},
					],
					preview: {
						select: {
							title: 'text',
						},
					},
				},
			],
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'blockContent',
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 8,
			description: 'Important for SEO.',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'sanityImage',
			options: {
				hotspot: true,
			},
			validation: (rule) => {
				return rule.custom((value: any) => {
					if (!value || !value?.asset?._ref) {
						return 'Image is required'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'person' }],
		}),
	],
	preview: {
		select: {
			title: 'title',
			authorFirstName: 'author.firstName',
			authorLastName: 'author.lastName',
			date: 'date',
			media: 'coverImage',
		},
		prepare({ title, media, authorFirstName, authorLastName, date }) {
			const subtitles = [
				authorFirstName &&
					authorLastName &&
					`by ${authorFirstName} ${authorLastName}`,
				date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
			].filter(Boolean)

			return { title, media, subtitle: subtitles.join(' ') }
		},
	},
	orderings: [
		{
			name: 'dateDesc',
			title: 'Posted Date, New',
			by: [{ field: 'date', direction: 'desc' }],
		},
		{
			name: 'dateAsc',
			title: 'Posted Date, Old',
			by: [{ field: 'date', direction: 'asc' }],
		},
	],
})
