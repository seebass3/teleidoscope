import {
	DocumentIcon,
	ListIcon,
	StackCompactIcon,
	TextIcon,
	VideoIcon,
} from '@sanity/icons'
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
			title: 'Page heading',
			description:
				'Add text blocks that will appear as separate headings with space between them at the top of the page.',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'textBlock',
					title: 'Text Block',
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
			hidden: ({ parent }) => {
				return !(
					parent?.pageType === 'offering' || parent?.pageType === 'about'
				)
			},
		}),
		defineField({
			name: 'features',
			title: 'Features',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'feature',
					title: 'Feature',
					icon: ListIcon,
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							title: 'Title',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							type: 'text',
							title: 'Description',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'media',
							type: 'media',
							title: 'Media',
						}),
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'description',
							image: 'media.image',
							videoPlaybackId: 'media.video.source.asset.playbackId',
							mediaType: 'media.mediaType',
						},
						prepare({ title, subtitle, image, videoPlaybackId, mediaType }) {
							const hasValidPlaybackId =
								videoPlaybackId && videoPlaybackId !== ''
							let videoPreview = null
							if (hasValidPlaybackId) {
								const url = `https://image.mux.com/${videoPlaybackId}/thumbnail.jpg?width=200&height=200&fit_mode=smartcrop&time=0`
								videoPreview = <img src={url} />
							}
							return {
								title: title,
								subtitle: subtitle,
								media:
									image || (mediaType === 'video' && videoPreview) || VideoIcon,
							}
						},
					},
				},
			],
			hidden: ({ parent }) => parent?.pageType !== 'offering',
		}),
		defineField({
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
											name: 'item',
											title: 'Item',
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
										title: title || 'Untitled Category',
										subtitle,
										media: StackCompactIcon,
									}
								},
							},
						},
					],
				}),
			],
			hidden: ({ parent }) => parent?.pageType !== 'offering',
		}),
		defineField({
			name: 'inTheNews',
			title: 'In the News',
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
						return rule.custom((value, context) => {
							if ((context.parent as any)?.active && !value) {
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
						return rule.custom((value, context) => {
							if ((context.parent as any)?.active && !value) {
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
						return rule.custom((value, context) => {
							if ((context.parent as any)?.active && !value) {
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
						return rule.custom((value, context) => {
							if ((context.parent as any)?.active && !value) {
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
						return rule.custom((value, context) => {
							if ((context.parent as any)?.active && !value) {
								return 'Required'
							}
							return true
						})
					},
				}),
			],
			hidden: ({ parent }) => parent?.pageType !== 'offering',
		}),
		defineField({
			name: 'useCases',
			title: 'Use Cases',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'useCase',
					title: 'Use Case',
					icon: StackCompactIcon,
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
						}),
						defineField({
							name: 'image',
							title: 'Image',
							type: 'sanityImage',
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
						}),
					],
					preview: {
						select: {
							title: 'title',
							subtitle: 'description',
							media: 'image',
						},
					},
				},
			],
			hidden: ({ parent }) => parent?.pageType !== 'offering',
		}),
	],
})
