import { cartStore } from '../../stores/cartStore'
import { storeVisibleHeader } from '../../stores/visibleHeader'
import { get } from 'svelte/store'

export async function addToCart(variant_id: string) {
	if (!variant_id) throw new Error('No variant id provided')
	const id = get(cartStore).id
	// Check if item already in cart and get quantity
	const quantityInCart: number | undefined = get(cartStore).items.filter(
		(item) => item.variant.id === variant_id
	)[0]?.quantity
	const lineItemId = get(cartStore).items.filter((item) => item.variant.id === variant_id)[0]?.id
	if (id) {
		const cart = await fetch('/api/addToCart', {
			method: 'POST',
			body: JSON.stringify({
				id,
				variant_id,
				lineItemId,
				quantityInCart
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json())

		cartStore.set(cart)
		storeVisibleHeader.set(true)
		return cart
	} else {
		throw new Error('No cart id provided')
	}
}
