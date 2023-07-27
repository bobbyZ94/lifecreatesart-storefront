export async function retrieveCart(id: string) {
	const cart = await fetch('/api/retrieveCart', {
		method: 'POST',
		body: JSON.stringify({
			id
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => res.json())
	return cart
}
