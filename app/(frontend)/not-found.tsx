import Link from 'next/link'

export default function NotFound() {
	return (
		<section id="not-found" className="h-fold">
			<div className="container-header py-xl">
				<div className="flex h-full items-center justify-center lg:justify-start xl:justify-end">
					<div className="flex flex-col gap-lg lg:ml-[223px] lg:w-[664px] xl:w-[922px]">
						<h1 className="text-slate">Page not found...</h1>
						<Link href="/" className="underlined-link ml-1">
							Return Home
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
