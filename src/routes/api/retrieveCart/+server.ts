import { json } from '@sveltejs/kit'
import { medusa } from '../../../medusa'
import type { RequestHandler } from '@sveltejs/kit'

export const POST = (async ({ request }) => {
	const { id } = await request.json()
	const cart = await medusa.carts.retrieve(id).then(({ cart }) => {
		return cart
	})
	return json(cart)
}) satisfies RequestHandler
