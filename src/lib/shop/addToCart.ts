import { cartStore } from '../../stores/cartStore'

export async function addToCart(id: string, variant_id: string) {
	console.log('FUNCTION', id, variant_id)
	if (id) {
		const cart = await fetch('/api/addToCart', {
			method: 'POST',
			body: JSON.stringify({
				id,
				variant_id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())
		cartStore.set(cart)
		return cart
	} else {
		throw new Error('No cart id provided')
	}
}
