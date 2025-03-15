/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */
'use client'

// Keep this import at the top to fix mux plugin bug
import { DefaultDocumentNodeResolver, structureTool } from 'sanity/structure'

import { visionTool } from '@sanity/vision'
import { SanityDocument, defineConfig, isDev } from 'sanity'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { muxInput } from 'sanity-plugin-mux-input'
import { defineDocuments, presentationTool } from 'sanity/presentation'
import { SanityLogo } from './branding/SanityLogo'
import { apiVersion, dataset, projectId, studioUrl } from './sanity/lib/api'
import { locations } from './sanity/lib/locations'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL =
	process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

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
	apiVersion,

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
						route: '/news/:slug',
						filter: `_type == "post" && slug.current == $slug || _id == $slug`,
					},
				]),
				// Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
				locations,
			},
		}),
		// Additional plugins for enhanced functionality
		muxInput(),
		...(isDev ? [visionTool()] : []),
	],

	schema: {
		types: schemaTypes,
	},
})
