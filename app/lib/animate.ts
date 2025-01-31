// Navigation Animation Variants

export const expandAnimVariants = {
	show: {
		height: 'auto',
		transition: {
			duration: 0.8,
			delay: 0.1,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	hide: {
		height: 0,
		transition: {
			duration: 0.6,
			delay: 0.1,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

export const fadeAnimVariants = {
	show: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
	hide: {
		opacity: 0,
		transition: {
			duration: 0.2,
		},
	},
}

export const swipeAnimVariants = {
	show: {
		opacity: 1,
		x: ['-1rem', '0rem'],
		transition: {
			x: {
				duration: 0.8,
				delay: 0.5,
				ease: [0.16, 1, 0.3, 1],
			},
			opacity: {
				duration: 0.2,
				delay: 0.5,
			},
		},
	},
	hide: {
		opacity: 0,
		x: '-1rem',
		transition: {
			x: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
			opacity: {
				duration: 0.1,
			},
		},
	},
}

export const lineAnimVariants = (lineHeight: number) => ({
	show: {
		height: lineHeight,
		transition: {
			duration: 0.8,
			delay: 0.1,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	hide: {
		height: 0,
		transition: {
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	},
})
