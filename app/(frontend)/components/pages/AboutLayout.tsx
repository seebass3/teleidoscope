import { Page } from '@/sanity.types'
import Hero from './Hero'

interface AboutLayoutProps {
	page: Page
}

export default function AboutLayout({ page }: AboutLayoutProps) {
	return <Hero title={page.name} hero={page.hero} heading={page.heading} />
}
