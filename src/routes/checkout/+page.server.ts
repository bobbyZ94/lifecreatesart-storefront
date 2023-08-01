import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { error, fail } from '@sveltejs/kit'
import { medusa } from '../../medusa'
import type { PageServerLoad, Actions } from './$types'

const schema = z.object({
	company: z.string().min(2).max(128).optional(),
	first_name: z.string().min(1).max(128),
	last_name: z.string().min(1).max(128),
	adress_1: z.string().min(2).max(256),
	adress_2: z.string().max(256).optional(),
	city: z.string().min(1).max(128),
	postal_code: z.string().min(1).max(128),
	province: z.string().min(1).max(128).optional(),
	country_code: z.string(),
	email: z.string(),
	phone: z.string().max(128).optional(),
	text: z.string().max(2000).optional(),
	conditions: z.string()
})

export const actions = {
	addShippingAdress: async ({ cookies, request }) => {
		// Get cartId from cookie
		const cartId = cookies.get('cart_id') || ''
		console.log('CART_ID_COOKIE', cartId)
		// Serverside superform api
		const form = await superValidate(request, schema)

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form })
		}
		try {
			await medusa.carts
				.update(cartId, {
					email: form.data.email,
					shipping_address: {
						company: form.data.company,
						first_name: form.data.first_name,
						last_name: form.data.last_name,
						address_1: form.data.adress_1,
						address_2: form.data.adress_2,
						city: form.data.city,
						country_code: form.data.country_code,
						province: form.data.province,
						postal_code: form.data.postal_code,
						phone: form.data.phone
					}
				})
				.then(({ cart }) => {
					return cart
				})

			return { form }
		} catch (e) {
			console.log(e)
			// Throw error which gets picked up by onError and display error message.
			throw error(500, {
				message:
					'Error while processing your shipping information. Please try again later or write me your order details via email!'
			})
		}
	}
} satisfies Actions

export const load = (async ({ params }) => {
	// Get list of regions for shipping
	const regions = await medusa.regions.list().then(({ regions }) => {
		return regions
	})

	// Server API:
	const form = await superValidate(schema)

	// Always return { form } in load AND form actions.
	return {
		form,
		regions
	}
}) satisfies PageServerLoad
