import { StackCompactIcon, TextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'process',
	title: 'Process',
	type: 'object',
	fields: [
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'sanityImage',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			description:
				'Each text blocks will have space between them and will appear below the title.',
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
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'highlights',
			title: 'Highlights',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			media: 'icon',
			title: 'title',
			subtitle: 'description',
		},
		prepare({ media, title, subtitle }) {
			const formattedSubtitle =
				(Array.isArray(subtitle) &&
					subtitle.map((block) => block.text).join(' ')) ||
				''

			return {
				title: title,
				subtitle: formattedSubtitle,
				media: media || StackCompactIcon,
			}
		},
	},
})
