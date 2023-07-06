let lastY: number = 0
let offsetY: number = 200
let tolerance: number = 0

function deriveHeader(y: number, dy: number, currentVisibility: boolean) {
	// show if at the top of page
	if (y < offsetY) {
		return true
	}
	// don't change the state unless scroll delta is above a threshold
	if (Math.abs(dy) <= tolerance) {
		return currentVisibility
	}
	// if scrolling up, show
	if (dy > 0) {
		return true
	}
	// if scrolling down, hide
	return false
}

export default function hideHeaderOnScrollDown(y: number, currentVisibility: boolean) {
	const dy = lastY - y
	lastY = y
	return deriveHeader(y, dy, currentVisibility)
}
