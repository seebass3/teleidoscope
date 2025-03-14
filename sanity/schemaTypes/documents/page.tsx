import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
import { DocumentIcon, TextIcon } from '@sanity/icons'
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
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			validation: (rule) => rule.required(),
			options: {
				source: 'title',
				maxLength: 96,
				slugify: (input) =>
					input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
				isUnique: isUniqueAcrossAllDocuments,
			},
		}),
		defineField({
			name: 'pageType',
			title: 'Page Type',
			type: 'string',
			options: {
				list: ['offering', 'about', 'legal'],
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'legalContent',
			title: 'Legal Content',
			type: 'blockContent',
			hidden: ({ parent }) => parent?.pageType !== 'legal',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (context.document?.pageType === 'legal' && !value) {
						return 'Legal content is required'
					}
					return true
				}),
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
			title: 'Page Hero',
			type: 'media',
			hidden: ({ parent }) => {
				return !(
					parent?.pageType === 'offering' || parent?.pageType === 'about'
				)
			},
			validation: (rule) =>
				rule.custom((value, context) => {
					const pageType = context.document?.pageType
					const isRequiredPageType =
						pageType === 'offering' || pageType === 'about'

					if (isRequiredPageType && !value) {
						return 'Hero section is required for offering and about pages'
					}
					return true
				}),
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
					type: 'feature',
				},
			],
			hidden: ({ parent }) => parent?.pageType !== 'offering',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (
						context.document?.pageType === 'offering' &&
						(!value || value.length === 0)
					) {
						return 'At least one feature is required'
					}
					return true
				}),
		}),
		defineField({
			name: 'productSpecs',
			title: 'Product Specs',
			type: 'productSpecs',
			hidden: ({ parent }) => parent?.pageType !== 'offering',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (context.document?.pageType === 'offering' && !value) {
						return 'Product specs are required'
					}
					return true
				}),
		}),
		defineField({
			name: 'inTheNews',
			title: 'In the News',
			type: 'newsReference',
			hidden: ({ parent }) => parent?.pageType !== 'offering',
		}),
		defineField({
			name: 'useCases',
			title: 'Use Cases',
			type: 'array',
			of: [
				{
					type: 'useCase',
				},
			],
			hidden: ({ parent }) => parent?.pageType !== 'offering',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (
						context.document?.pageType === 'offering' &&
						(!value || value.length === 0)
					) {
						return 'At least one use case is required'
					}
					return true
				}),
		}),
		defineField({
			name: 'expertise',
			title: 'Expertise',
			type: 'array',
			of: [
				{
					type: 'expertise',
				},
			],
			hidden: ({ parent }) => parent?.pageType !== 'about',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (
						context.document?.pageType === 'about' &&
						(!value || value.length < 1)
					) {
						return 'At least one expertise item is required'
					}
					return true
				}),
		}),
		defineField({
			name: 'careers',
			title: 'Careers',
			type: 'careers',
			hidden: ({ parent }) => parent?.pageType !== 'about',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (context.document?.pageType === 'about' && !value) {
						return 'Careers section is required'
					}
					return true
				}),
		}),
		defineField({
			name: 'process',
			title: 'Process',
			type: 'array',
			of: [
				{
					type: 'process',
				},
			],
			hidden: ({ parent }) => parent?.pageType !== 'about',
			validation: (rule) =>
				rule.custom((value, context) => {
					if (
						context.document?.pageType === 'about' &&
						(!value || value.length < 1)
					) {
						return 'At least one process item is required'
					}
					return true
				}),
		}),
		defineField({
			name: 'contactForm',
			title: 'Contact Form',
			type: 'contactForm',
			hidden: ({ parent }) => {
				return !(
					parent?.pageType === 'offering' || parent?.pageType === 'about'
				)
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'pageType',
			image: 'hero.image',
			videoPlaybackId: 'hero.video.source.asset.playbackId',
			mediaType: 'hero.mediaType',
		},
		prepare({ title, subtitle, image, videoPlaybackId, mediaType }) {
			const hasValidPlaybackId = videoPlaybackId && videoPlaybackId !== ''
			let videoPreview = null

			if (hasValidPlaybackId) {
				const url = `https://image.mux.com/${videoPlaybackId}/thumbnail.jpg?width=200&height=200&fit_mode=smartcrop&time=0`
				videoPreview = <img src={url} />
			}

			return {
				title: title || 'Untitled Page',
				subtitle: subtitle
					? subtitle.charAt(0).toUpperCase() + subtitle.slice(1)
					: 'No page type selected',
				media: image || (mediaType === 'video' && videoPreview) || DocumentIcon,
			}
		},
	},
})
