import { Suspense } from 'react'
import { ContactFormPage } from './components/contact/ContactFormPage'
import Landing from './components/homepage/Landing'
import Logos from './components/homepage/Logos'
import Offerings from './components/homepage/Offerings'
import Process from './components/homepage/Process'
import { RecentPosts } from './components/posts/RecentPosts'

const contactContent =
	'Get in touch with our team to discuss how our innovative approaches can advance your mission-critical objectives.'

export default async function Page() {
	return (
		<>
			<Landing />
			<Offerings />
			<ContactFormPage variant="primary" content={contactContent} />
			<Process />
			<Logos />
			<Suspense>{await RecentPosts({ limit: 2 })}</Suspense>
		</>
	)
}
