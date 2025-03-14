import { StackCompactIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'productSpecs',
	title: 'Product Specs',
	type: 'object',
	fields: [
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
		}),
		defineField({
			name: 'rows',
			title: 'Rows',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'row',
					title: 'Row',
					fields: [
						defineField({
							name: 'category',
							title: 'Category',
							type: 'string',
							validation: (rule) => rule.required(),
						}),
						defineField({
							name: 'items',
							title: 'Category Items',
							description:
								'Leave blank if the category is a standalone product highlight.',
							type: 'array',
							of: [
								{
									type: 'string',
								},
							],
						}),
					],
					preview: {
						select: {
							title: 'category',
							items: 'items',
						},
						prepare({ title, items }) {
							const subtitle =
								items && items.length > 0
									? items.join(', ')
									: 'No items (standalone highlight)'

							return {
								title: title,
								subtitle,
								media: StackCompactIcon,
							}
						},
					},
				},
			],
			validation: (rule) =>
				rule.custom((value, context: any) => {
					const description = context.parent?.description

					if (description && (!value || value.length === 0)) {
						return 'At least one specification row is required'
					}
					return true
				}),
		}),
	],
})
