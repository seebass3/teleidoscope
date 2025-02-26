import { cn } from '@/app/lib/utils'
import Button from '../Button'
import Corner from '../Corner'

interface ContactFormPageProps {
	variant: 'primary' | 'secondary'
	content: string
}

export function ContactFormPage({ variant, content }: ContactFormPageProps) {
	return (
		<section id="contact" className="bg-sand">
			<div className="container py-2xl">
				<div className="flex flex-col gap-x-[30px] gap-y-md border-l border-moss/35 pl-line lg:flex-row">
					<div className="flex basis-1/2 flex-col gap-y-sm">
						<div className="flex items-start justify-between">
							<h2
								className={cn(
									'text-xl tracking-[-1.12px]',
									variant === 'primary' ? 'text-slate' : 'text-solar',
								)}
							>
								{variant === 'primary' ? 'Custom Solutions' : "Let's Talk"}
							</h2>
							<Corner />
						</div>
						<p className="text-sm text-slate md:max-w-[325px] lg:max-w-[288px]">
							{content}
						</p>
					</div>
					<div className="flex basis-1/2 flex-col lg:pt-[6px]">
						<form className="flex flex-col">
							<div className="flex max-md:flex-col md:gap-[15px] lg:gap-[30px]">
								<input
									type="text"
									name="name"
									placeholder="Your Name"
									className="flex-1 border-t border-moss bg-transparent pb-10 pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-moss focus:outline-none"
									required
								/>
								<input
									type="email"
									name="email"
									placeholder="Your Email"
									className="flex-1 border-t border-moss bg-transparent pb-10 pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-moss focus:outline-none"
									required
								/>
							</div>
							<textarea
								name="message"
								placeholder="Your Message"
								className="mb-sm border-y border-moss bg-transparent pb-[72px] pl-1 pr-2 pt-2 font-action text-micro uppercase text-solar placeholder:text-moss focus:outline-none"
								required
							/>
							<Button type="submit" className="md:self-end">
								Send Message
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
