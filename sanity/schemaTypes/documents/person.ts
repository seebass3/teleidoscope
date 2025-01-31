import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Person schema.  Define and edit the fields for the 'person' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export default defineType({
	name: 'person',
	title: 'Person',
	icon: UserIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'firstName',
			title: 'First Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'lastName',
			title: 'Last Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
	],
	// List preview configuration. https://www.sanity.io/docs/previews-list-views
	preview: {
		select: {
			firstName: 'firstName',
			lastName: 'lastName',
		},
		prepare(selection) {
			return {
				title: `${selection.firstName} ${selection.lastName}`,
				subtitle: 'Person',
			}
		},
	},
})
