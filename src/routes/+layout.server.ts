import { medusa } from '../medusa'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
	const cartId = cookies.get('cart_id')
	if (!cartId) {
		const cart = await medusa.carts
			.create({
				region_id: 'reg_01H6P68EZ1DAAN6ZXKPAWEW5JW'
			})
			.then(({ cart }) => {
				return cart
			})
		cookies.set('cart_id', cart.id)
		return cart
	} else {
		return {
			cart: await medusa.carts.retrieve(cartId).then(({ cart }) => {
				return cart
			})
		}
	}
}) satisfies LayoutServerLoad
