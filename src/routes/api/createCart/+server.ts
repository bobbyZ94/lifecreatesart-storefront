import { json } from '@sveltejs/kit'
import { medusa } from '../../../medusa'
import type { RequestHandler } from '@sveltejs/kit'

export const POST = (async ({ request }) => {
	const cart = await medusa.carts.create({}).then(({ cart }) => {
		return cart
	})
	return json(cart)
}) satisfies RequestHandler
