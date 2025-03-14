import { cn } from '@/app/lib/utils'

export default function Seperator({
	orientation,
	variant,
	className,
}: {
	orientation: 'horizontal' | 'vertical'
	variant: 'moss' | 'sand'
	className?: string
}) {
	return (
		<div
			className={cn(
				'opacity-35',
				orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
				variant === 'moss' ? 'bg-moss' : 'bg-sand',
				className,
			)}
		/>
	)
}
