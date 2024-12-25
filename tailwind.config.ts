import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		extend: {
			boxShadow: {
				layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
			},
			colors: {
				offWhite: '#faf9f7',
				slate: '#324e53',
				sandstone: '#eeeae4',
				moss: '#738889',
				flint: '#1f2424',
				solar: '#ff6d00',
			},
			fontFamily: {
				sans: ['var(--font-inter)'],
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
} satisfies Config
