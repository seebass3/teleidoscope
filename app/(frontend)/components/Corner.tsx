interface CornerProps {
	variant?: 'solar' | 'sand' | 'white' | 'flint'
}

const variantColors = {
	solar: '#FF6D00',
	sand: '#EEEAE4',
	white: '#F2F1EF',
	flint: '#1F2424',
} as const

export default function Corner({ variant = 'solar' }: CornerProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
		>
			<path
				d="M10 9.53674e-07L22 4.29138e-07L22 12L10 9.53674e-07Z"
				fill={variantColors[variant]}
			/>
		</svg>
	)
}
