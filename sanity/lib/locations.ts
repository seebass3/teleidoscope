import { defineLocations, DocumentLocation } from 'sanity/presentation'

const homeLocation = {
	title: 'Home',
	href: '/',
} satisfies DocumentLocation

function resolveHref(documentType?: string, slug?: string): string | undefined {
	switch (documentType) {
		case 'post':
			return slug ? `/news/${slug}` : undefined
		case 'page':
			return slug ? `/${slug}` : undefined
		default:
			console.warn('Invalid document type:', documentType)
			return undefined
	}
}

export const locations = {
	settings: defineLocations({
		locations: [homeLocation],
		message: 'This document is used on all pages',
		tone: 'positive',
	}),
	page: defineLocations({
		select: {
			name: 'title',
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
}
