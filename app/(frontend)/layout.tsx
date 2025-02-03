import '../globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { VisualEditing } from 'next-sanity'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'

import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { handleError } from './client-utils'
import DraftModeToast from './components/DraftModeToast'
import Footer from './components/navigation/Footer'
import Header from './components/navigation/Header'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
	const { data: settings } = await sanityFetch({
		query: settingsQuery,
		// Metadata should never contain stega
		stega: false,
	})
	const title = settings?.title || 'Teleidoscope'
	const description =
		settings?.description || 'State of the art tracking software and systems.'

	const ogImage = resolveOpenGraphImage(settings?.ogImage)
	let metadataBase: URL | undefined = undefined
	try {
		metadataBase = settings?.ogImage?.metadataBase
			? new URL(settings.ogImage.metadataBase)
			: undefined
	} catch {
		// ignore
	}
	return {
		metadataBase,
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description: description,
		openGraph: {
			images: ogImage ? [ogImage] : [],
		},
	}
}

const sohne = localFont({
	variable: '--font-family-text',
	src: '../lib/fonts/Sohne-Buch.woff2',
	display: 'swap',
})

const sohneMono = localFont({
	variable: '--font-family-mono',
	src: '../lib/fonts/SohneMono-Buch.woff2',
	display: 'swap',
})

const sohneKraftig = localFont({
	variable: '--font-family-action',
	src: '../lib/fonts/SohneMono-Kraftig.woff2',
	display: 'swap',
})

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { isEnabled: isDraftMode } = await draftMode()

	return (
		<html
			lang="en"
			className={`${sohne.variable} ${sohneMono.variable} ${sohneKraftig.variable} bg-offWhite font-body text-flint`}
		>
			<body>
				<section className="min-h-screen pt-24">
					<Header />
					<main className="">{children}</main>
					<Footer />
				</section>
				<Toaster />
				{isDraftMode && (
					<>
						<DraftModeToast />
						<VisualEditing />
					</>
				)}
				<SanityLive onError={handleError} />
				<SpeedInsights />
			</body>
		</html>
	)
}
