import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1280px',
		},
		container: {
			center: true,
			padding: '2rem',
		},
		fontSize: {
			// Hero Titles
			'hero-lg': ['100px', '102px'],
			'hero-md': ['72px', '73px'],
			'hero-sm': ['40px', '43px'],

			// H1 Titles
			'h1-lg': ['72px', '74px'],
			'h1-md': ['56px', '58px'],
			'h1-sm': ['40px', '43px'],

			// H2 Titles
			'h2-lg': ['56px', '58px'],
			'h2-md': ['48px', '50px'],
			'h2-sm': ['40px', '43px'],

			// H3 Titles
			'h3-lg': ['32px', '35px'],
			'h3-md': ['28px', '32px'],
			'h3-sm': ['24px', '28px'],

			// H4 Titles
			h4: ['20px', '21px'],

			// Body Copy
			body: ['14px', '18px'],
			'body-sm': ['16px', '20px'],

			// Callouts
			callout: ['12x', '14px'],
			'callout-sm': ['14px', '18px'],

			// Article
			'article-lg': ['18px', '26px'],
			'article-md': ['16px', '22px'],
			'article-sm': ['16px', '20px'],

			// CTAs
			cta: ['12px', '13px'],
			'cta-sm': ['14px', '15px'],

			// Links
			link: ['12px', '13px'],
			'link-sm': ['14px', '15px'],
		},
		fontFamily: {
			body: ['var(--font-family-text)'],
			mono: ['var(--font-family-mono)'],
			action: ['var(--font-family-action)'],
		},
		colors: {
			black: '#000000',
			white: '#faf9f7',
			offWhite: '#f2f1ef',
			sand: '#eeeae4',
			moss: '#738889',
			slate: '#324e53',
			flint: '#1f2424',
			solar: '#ff6d00',
		},
		extend: {
			boxShadow: {
				layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
			},
			spacing: {
				'header-height': 'var(--header-height)',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [typography],
} satisfies Config
