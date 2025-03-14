import page from './documents/page'
import person from './documents/person'
import post from './documents/post'
import blockContent from './objects/blockContent'
import callToAction from './objects/callToAction'
import careers from './objects/careers'
import contactForm from './objects/contactForm'
import expertise from './objects/expertise'
import feature from './objects/feature'
import link from './objects/link'
import media from './objects/media'
import newsReference from './objects/newsReference'
import process from './objects/process'
import productSpec from './objects/productSpecs'
import sanityImage from './objects/sanityImage'
import useCase from './objects/useCase'
import settings from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
	// Singletons
	settings,
	// Documents
	page,
	post,
	person,
	// Objects
	blockContent,
	callToAction,
	careers,
	contactForm,
	expertise,
	feature,
	link,
	media,
	newsReference,
	productSpec,
	process,
	sanityImage,
	useCase,
]
