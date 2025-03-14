import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
	'flex shrink-0 items-center justify-center px-[12px] py-[8px] font-action text-micro uppercase leading-cta w-full',
	{
		variants: {
			variant: {
				primary: 'bg-solar text-white',
				outlineDark: 'border border-slate text-slate',
				outlineLight: 'border border-sand text-sand',
				dashed: 'border border-dashed border-slate text-slate',
			},
			size: {
				default: 'md:w-[324px] lg:w-[287px]',
				small: 'md:w-[125px] h-[36px] md:w-[125px] lg:h-fit',
				custom: '',
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
