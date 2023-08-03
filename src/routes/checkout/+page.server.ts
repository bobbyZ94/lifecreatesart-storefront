import { z } from 'zod'
import { superValidate, message } from 'sveltekit-superforms/server'
import { error, fail } from '@sveltejs/kit'
import { medusa } from '../../medusa'
import type { PageServerLoad, Actions } from './$types'

const schema = z.object({
	company: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	first_name: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' }),
	last_name: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' }),
	address_1: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(256, { message: 'Must be 256 or fewer characters long' }),
	address_2: z
		.string()
		.min(2, { message: 'Must have atleast 1 chracter' })
		.max(256, { message: 'Must be 256 or fewer characters long' })
		.optional(),
	city: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' }),
	postal_code: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' }),
	province: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	country_code: z.string(),
	different_billing_address: z.boolean().default(false).optional(),
	billing_company: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	billing_first_name: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	billing_last_name: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	billing_address_1: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(256, { message: 'Must be 256 or fewer characters long' })
		.optional(),
	billing_address_2: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(256, { message: 'Must be 256 or fewer characters long' })
		.optional(),
	billing_city: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	billing_postal_code: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	billing_province: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	billing_country_code: z.string().optional(),
	email: z.string().email().max(128, { message: 'Must be 128 or fewer characters long' }),
	phone: z
		.string()
		.min(4, { message: 'Must have atleast 4 chracters' })
		.max(128, { message: 'Must be 128 or fewer characters long' })
		.optional(),
	text: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(2000, { message: 'Must be 2000 or fewer characters long' })
		.optional(),
	conditions: z.string()
})

export const actions = {
	addShippingAddress: async ({ cookies, request }) => {
		// Get cartId from cookie
		const cartId = cookies.get('cart_id') || ''
		// Serverside superform api
		const form = await superValidate(request, schema)
		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form })
		}
		const shipping_address = {
			company: form.data.company,
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			address_1: form.data.address_1,
			address_2: form.data.address_2,
			city: form.data.city,
			country_code: form.data.country_code,
			province: form.data.province,
			postal_code: form.data.postal_code,
			phone: form.data.phone
		}
		// Check if billing_address different than shipping_address
		const billing_address = form.data.different_billing_address
			? {
					company: form.data.billing_company,
					first_name: form.data.billing_first_name,
					last_name: form.data.billing_last_name,
					address_1: form.data.billing_address_1,
					address_2: form.data.billing_address_2,
					city: form.data.billing_city,
					country_code: form.data.billing_country_code,
					province: form.data.billing_province,
					postal_code: form.data.billing_postal_code
			  }
			: shipping_address
		try {
			await medusa.carts
				.update(cartId, {
					context: {
						shipping_message: form.data.text
					},
					email: form.data.email,
					shipping_address,
					billing_address
				})
				.then(({ cart }) => {
					return cart
				})

			return message(form, 'success')
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
