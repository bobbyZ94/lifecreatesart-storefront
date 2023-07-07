export default function removeScrollbar(toggelNavlist: boolean, transitionDuration: number) {
	if (toggelNavlist && document.body) {
		let oldWidth = document.documentElement.clientWidth
		document.body.classList.add('overflow-hidden')
		let newWidth = document.documentElement.clientWidth
		let scrollbarWidth = Math.max(0, newWidth - oldWidth)
		document.body.style.marginRight = `${scrollbarWidth}px`
		document.getElementById('Navbar')!.style.right = `${scrollbarWidth}px`
	} else {
		setTimeout(() => {
			document.querySelector('body')?.classList.remove('overflow-hidden')
			document.body.style.marginRight = '0px'
			document.getElementById('Navbar')!.style.right = '0px'
		}, transitionDuration)
	}
}
