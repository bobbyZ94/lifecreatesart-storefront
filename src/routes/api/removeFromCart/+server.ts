import { json } from '@sveltejs/kit'
import { medusa } from '../../../medusa'
import type { RequestHandler } from '@sveltejs/kit'

export const POST = (async ({ request }) => {
	const { id, lineItemId, quantityInCart } = await request.json()
	let cart: any
	if (quantityInCart > 1) {
		cart = await medusa.carts.lineItems
			.update(id, lineItemId, { quantity: quantityInCart - 1 })
			.then(({ cart }) => {
				return cart
			})
	} else {
		cart = await medusa.carts.lineItems.delete(id, lineItemId).then(({ cart }) => {
			return cart
		})
	}
	return json(cart)
}) satisfies RequestHandler
