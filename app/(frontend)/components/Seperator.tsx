import { cn } from '@/app/lib/utils'

interface SeperatorProps {
	orientation: 'horizontal' | 'vertical'
	variant: 'moss' | 'sand'
}

export default function Seperator({ orientation, variant }: SeperatorProps) {
	return (
		<div
			className={cn(
				'shrink-0 opacity-35',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				variant === 'moss' ? 'bg-moss' : 'bg-sand',
			)}
		/>
	)
}
