import '../globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { toPlainText, VisualEditing } from 'next-sanity'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import { Toaster } from 'sonner'

import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { handleError } from './client-utils'
import DraftModeToast from './components/DraftModeToast'
import Footer from './components/Footer'
import Header from './components/Header'

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
	const title = settings?.title
	const description = settings?.description

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
		description: toPlainText(description),
		openGraph: {
			images: ogImage ? [ogImage] : [],
		},
	}
}

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
})

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { isEnabled: isDraftMode } = await draftMode()

	return (
		<html lang="en" className={`${inter.variable} bg-offWhite text-black`}>
			<body>
				<section className="min-h-screen pt-24">
					<Toaster />
					{isDraftMode && (
						<>
							<DraftModeToast />
							<VisualEditing />
						</>
					)}
					<SanityLive onError={handleError} />
					<Header />
					<main className="">{children}</main>
					<Footer />
				</section>
				<SpeedInsights />
			</body>
		</html>
	)
}
