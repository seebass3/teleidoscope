import { BulbOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Call to action schema object.  Objects are reusable schema structures document.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export default defineType({
	name: 'callToAction',
	title: 'Call to Action',
	type: 'object',
	icon: BulbOutlineIcon,
	fields: [
		defineField({
			name: 'buttonText',
			title: 'Button text',
			type: 'string',
			validation: (rule) => {
				return rule.custom((value, context: any) => {
					const link = context.parent?.link
					const hasLinkContent =
						link &&
						((link.linkType === 'href' && link.href) ||
							(link.linkType === 'page' && link.page && link.page._ref) ||
							(link.linkType === 'post' && link.post && link.post._ref) ||
							link.linkType === 'contact')

					if (hasLinkContent && !value) {
						return 'Button text is required when Button link is set'
					}
					return true
				})
			},
		}),
		defineField({
			name: 'link',
			title: 'Button link',
			type: 'link',
			options: {
				collapsible: false,
			},
			validation: (rule) => {
				return rule.custom((value: any, context: any) => {
					const buttonText = context.parent?.buttonText
					const hasButtonText = buttonText && buttonText.trim() !== ''

					if (hasButtonText && (!value || !value.linkType)) {
						return 'Button link is required when button text is provided'
					}

					return true
				})
			},
		}),
	],
	preview: {
		select: {
			title: 'buttonText',
		},
		prepare(selection) {
			const { title } = selection

			return {
				title: title,
				subtitle: 'Call to Action',
			}
		},
	},
})
