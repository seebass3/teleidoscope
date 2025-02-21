import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
	'flex shrink-0 items-center justify-center px-3 py-2 font-action text-micro uppercase',
	{
		variants: {
			variant: {
				primary: 'bg-solar text-white',
				outline: 'border border-slate text-slate',
			},
			size: {
				default: 'w-full md:w-[324px] lg:w-[287px]',
				small: 'h-[36px] w-full md:w-[125px] lg:h-[31px]',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	},
)

export default function Button({
	children,
	className,
	variant,
	size,
	...rest
}: ButtonProps) {
	return (
		<button
			className={clsx(buttonVariants({ variant, size, className }))}
			{...rest}
		>
			{children}
		</button>
	)
}
