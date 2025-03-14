import { sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { ContactFormModal } from '../../components/contact/ContactFormModal'
import { Modal } from './modal'

export default async function Page() {
	const { data: settings } = await sanityFetch({ query: settingsQuery })
	const header = settings?.contactForm?.header
	const content = settings?.contactForm?.content

	return (
		<Modal>
			<ContactFormModal header={header} content={content} />
		</Modal>
	)
}
