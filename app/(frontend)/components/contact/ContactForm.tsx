import Button from '../Button'
import Corner from '../Corner'

export function ContactForm() {
	return (
		<div className="flex flex-col border-l border-sand/35 pl-line">
			<div className="mb-sm flex items-center justify-between">
				<h2 className="text-xl tracking-[-1.12px] text-solar">
					Let&#39;s Talk
				</h2>
				<Corner />
			</div>
			<p className="mb-md text-sm text-sand">
				Get in touch with our team to discuss how our <br />
				innovative approaches can advance your mission-
				<br />
				critical objectives.
			</p>
			<form className="flex flex-col">
				<div className="flex max-md:flex-col md:gap-[15px] lg:gap-[30px]">
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						className="bg-transparent flex-1 border-t border-sand/35 pb-10 pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-sand focus:outline-none"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Your Email"
						className="bg-transparent flex-1 border-t border-sand/35 pb-10 pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-sand focus:outline-none"
						required
					/>
				</div>
				<textarea
					name="message"
					placeholder="Your Message"
					className="bg-transparent text-action mb-sm border-y border-sand/35 pb-[72px] pl-1 pr-2 pt-2 font-mono uppercase text-solar placeholder:text-sand focus:outline-none"
					required
				/>
				<Button type="submit" className="md:self-end">
					Send Message
				</Button>
			</form>
		</div>
	)
}
