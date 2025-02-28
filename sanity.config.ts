/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */
'use client'

import { visionTool } from '@sanity/vision'
import { SanityDocument, defineConfig, isDev } from 'sanity'
import { Iframe } from 'sanity-plugin-iframe-pane'
import {
	defineDocuments,
	defineLocations,
	presentationTool,
	type DocumentLocation,
} from 'sanity/presentation'
import { DefaultDocumentNodeResolver, structureTool } from 'sanity/structure'
import { SanityLogo } from './branding/SanityLogo'
import { dataset, projectId, studioUrl } from './sanity/lib/api'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL =
	process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

// Define the home location for the presentation tool
const homeLocation = {
	title: 'Home',
	href: '/',
} satisfies DocumentLocation

// resolveHref() is a convenience function that resolves the URL
// path for different document types and used in the presentation tool.
function resolveHref(documentType?: string, slug?: string): string | undefined {
	switch (documentType) {
		case 'post':
			return slug ? `/news/${slug}` : undefined
		default:
			console.warn('Invalid document type:', documentType)
			return undefined
	}
}

function getPreviewUrl(doc: SanityDocument | any) {
	const baseUrl = SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

	if (!doc?.slug?.current) return baseUrl

	switch (doc._type) {
		case 'post':
			return `${baseUrl}/news/${doc.slug.current}`
		case 'page':
			return `${baseUrl}/${doc.slug.current}`
		default:
			return baseUrl
	}
}

const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType },
) => {
	switch (schemaType) {
		case `post`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			])
		default:
			return S.document().views([S.view.form()])
	}
}

// Main Sanity configuration
export default defineConfig({
	name: 'default',
	title: 'Teleidoscope',
	icon: () => SanityLogo,

	basePath: studioUrl,
	projectId,
	dataset,

	plugins: [
		structureTool({
			title: 'Content',
			structure,
			defaultDocumentNode,
		}),
		presentationTool({
			title: 'Visual Editing',
			previewUrl: {
				origin: SANITY_STUDIO_PREVIEW_URL,
				previewMode: {
					enable: '/api/draft-mode/enable',
				},
			},
			resolve: {
				// The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
				mainDocuments: defineDocuments([
					{
						route: '/:slug',
						filter: `_type == "page" && slug.current == $slug || _id == $slug`,
					},
					{
						route: '/posts/:slug',
						filter: `_type == "post" && slug.current == $slug || _id == $slug`,
					},
				]),
				// Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
				locations: {
					settings: defineLocations({
						locations: [homeLocation],
						message: 'This document is used on all pages',
						tone: 'positive',
					}),
					page: defineLocations({
						select: {
							name: 'name',
							slug: 'slug.current',
						},
						resolve: (doc) => ({
							locations: [
								{
									title: doc?.name || 'Untitled',
									href: resolveHref('page', doc?.slug)!,
								},
							],
						}),
					}),
					post: defineLocations({
						select: {
							title: 'title',
							slug: 'slug.current',
						},
						resolve: (doc) => ({
							locations: [
								{
									title: doc?.title || 'Untitled',
									href: resolveHref('post', doc?.slug)!,
								},
								{
									title: 'Home',
									href: '/',
								} satisfies DocumentLocation,
							].filter(Boolean) as DocumentLocation[],
						}),
					}),
				},
			},
		}),
		// Additional plugins for enhanced functionality
		...(isDev ? [visionTool()] : []),
	],

	schema: {
		types: schemaTypes,
	},
})
