import Button from '../Button'
import Corner from '../Corner'

export function ContactFormModal() {
	return (
		<div className="flex flex-col border-l border-sand/35 pl-line">
			<div className="mb-sm flex items-start justify-between">
				<h2 className="text-solar">Let&#39;s Talk</h2>
				<Corner />
			</div>
			<p className="mb-md max-w-[325px] text-sand">
				Get in touch with our team to discuss how our innovative approaches can
				advance your mission- critical objectives.
			</p>
			<form className="flex flex-col">
				<div className="flex max-md:flex-col md:gap-[15px] lg:gap-[30px]">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						className="flex-1 border-t border-sand/35 bg-transparent pb-10 pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-sand focus:outline-none"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						className="flex-1 border-t border-sand/35 bg-transparent pb-10 pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-sand focus:outline-none"
						required
					/>
				</div>
				<textarea
					name="message"
					placeholder="Your Message"
					className="mb-sm border-y border-sand/35 bg-transparent pb-[72px] pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-sand focus:outline-none"
					required
				/>
				<Button type="submit" className="md:self-end">
					Send Message
				</Button>
			</form>
		</div>
	)
}
