import type { Handle } from '@sveltejs/kit'
import { medusa } from './medusa'
import { cartStore } from './stores/cartStore'
import { browser } from '$app/environment'

export const handle = (async ({ event, resolve }) => {
	// Get cart id or create a new one
	if (browser) {
		const id = localStorage.getItem('cart_id')
		if (id) {
			medusa.carts.retrieve(id).then(({ cart }) => cartStore.set(cart))
		} else {
			medusa.carts.create().then(({ cart }) => {
				localStorage.setItem('cart_id', cart.id)
			})
		}
	}

	const response = await resolve(event)
	return response
}) satisfies Handle
