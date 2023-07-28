import { cartStore } from '../../stores/cartStore'
import { get } from 'svelte/store';

export async function addToCart(variant_id: string) {
	const id = get(cartStore).id
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
