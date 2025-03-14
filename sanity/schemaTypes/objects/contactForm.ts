import { defineField, defineType } from 'sanity'
// ICON

export default defineType({
	name: 'contactForm',
	title: 'Contact Form Content',
	type: 'object',
	fields: [
		defineField({
			name: 'header',
			title: 'Header',
			type: 'string',
			initialValue: 'Custom Solutions',
			description: 'If left blank, it will default to "Custom Solutions"',
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'text',
			initialValue:
				'Get in touch with our team to discuss how our innovative approaches can advance your mission-critical objectives.',
			description:
				'If left blank, it will default to "Get in touch with our team to discuss how our innovative approaches can advance your mission-critical objectives."',
			rows: 5,
		}),
	],
})
