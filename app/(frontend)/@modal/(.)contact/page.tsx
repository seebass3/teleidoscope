import { ContactFormModal } from '../../components/contact/ContactFormModal'
import { Modal } from './modal'

export default async function Page() {
	return (
		<Modal>
			<ContactFormModal />
		</Modal>
	)
}
