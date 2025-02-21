import { useEffect, useState } from 'react'

export const useScreenDetect = () => {
	const [width, setWidth] = useState<number | undefined>(undefined)

	useEffect(() => {
		setWidth(window.innerWidth)

		const handleWindowSizeChange = () => {
			setWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const isMobile = width ? width < 768 : false
	const isTablet = width ? width < 1024 : false
	const isDesktop = width ? width > 1024 : false

	return { isMobile, isTablet, isDesktop }
}
