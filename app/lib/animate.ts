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
			duration: 0.8,
			delay: 0.1,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

export const logoTransitionVariants = {
	show: {
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	hide: {
		y: '100%',
		transition: {
			duration: 0.4,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

export const slideInAnimVariants = {
	show: {
		x: '0%',
		transition: {
			duration: 0.8,
			delay: 0.1,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	hide: {
		x: '100%',
		transition: {
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

export const slideDownAnimVariants = {
	show: {
		y: '0%',
		transition: {
			duration: 0.8,
			delay: 0.1,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	hide: {
		y: '-100%',
		transition: {
			duration: 0.6,
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

export const slowFadeAnimVariants = {
	show: {
		opacity: 1,
		transition: {
			duration: 0.6,
			delay: 0.8,
			ease: [0.16, 1, 0.3, 1],
		},
	},
	hide: {
		opacity: 0,
		transition: {
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	},
}

export const navUlAnimVariants = {
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
	hide: {
		opacity: 0,
	},
}

export const navLiAnimVariants = {
	show: {
		opacity: 1,
		y: ['.5rem', '0rem'],
		transition: {
			x: {
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			},
			opacity: {
				duration: 0.2,
			},
		},
	},
	hide: {
		opacity: 0,
		y: '.5rem',
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
