export async function createCart() {
	const cart = await fetch('/api/createCart', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json())
	return cart
}
