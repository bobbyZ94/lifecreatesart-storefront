import { json } from '@sveltejs/kit'
import { cartStore } from '../../stores/cartStore'
import { get } from 'svelte/store'
import { medusa } from '../../medusa'
import type { RequestHandler } from '@sveltejs/kit'

export const POST = (async ({ request }) => {
	await medusa.carts.lineItems
		.create(get(cartStore).id, {
			variant_id,
			quantity: 1
		})
		.then(({ cart }) => setCart(cart))
	return json(record)
}) satisfies RequestHandler
