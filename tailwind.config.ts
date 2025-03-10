import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		fontSize: {
			'3xl': ['var(--font-size-3xl)', 'var(--font-line-height-3xl)'],
			'2xl': ['var(--font-size-2xl)', 'var(--font-line-height-2xl)'],
			xl: ['var(--font-size-xl)', 'var(--font-line-height-xl)'],
			lg: ['var(--font-size-lg)', 'var(--font-line-height-lg)'],
			md: ['var(--font-size-md)', 'var(--font-line-height-md)'],
			sm: ['var(--font-size-sm)', 'var(--font-line-height-sm)'],
			micro: ['var(--font-size-micro)', 'var(--font-line-height-micro)'],
		},
		fontFamily: {
			body: ['var(--font-family-text)'],
			mono: ['var(--font-family-mono)'],
			action: ['var(--font-family-action)'],
		},
		colors: {
			black: '#000000',
			white: '#FAF9F7',
			offWhite: '#F2F1EF',
			sand: '#EEEAE4',
			moss: '#738889',
			slate: '#324E53',
			flint: '#1F2424',
			solar: '#FF6D00',
			transparent: 'transparent',
		},
		extend: {
			backgroundImage: {
				'linear-gradient':
					'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%);',
			},
			spacing: {
				'header-height': 'var(--header-height)',
				'2xl': 'var(--spacing-2xl)',
				xl: 'var(--spacing-xl)',
				lg: 'var(--spacing-lg)',
				md: 'var(--spacing-md)',
				sm: 'var(--spacing-sm)',
				xs: 'var(--spacing-xs)',
				micro: 'var(--spacing-micro)',
				nano: 'var(--spacing-nano)',
				line: 'var(--spacing-line)',
			},
			height: {
				fold: 'calc(100vh - var(--header-height))',
			},
			lineHeight: {
				cta: 'var(--font-line-height-cta)',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
} satisfies Config
