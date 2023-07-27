export async function addToCart() {
	await fetch('/api/addEvent', {
		method: 'POST',
		body: JSON.stringify({}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
