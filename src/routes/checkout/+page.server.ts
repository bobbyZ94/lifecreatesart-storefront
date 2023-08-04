import { superValidate, message } from 'sveltekit-superforms/server'
import { error, fail } from '@sveltejs/kit'
import { medusa } from '../../medusa'
import { shippingFormSchema } from '$lib/schemas'
import type { PageServerLoad, Actions } from './$types'

export const actions = {
	addShippingAddress: async ({ cookies, request }) => {
		// Get cartId from cookie
		const cartId = cookies.get('cart_id') || ''
		// Serverside superform api
		const shippingForm = await superValidate(request, shippingFormSchema)
		// Convenient validation check:
		if (!shippingForm.valid) {
			// Again, always return { shippingForm } and things will just work.
			return fail(400, { shippingForm })
		}

		const shipping_address = {
			company: shippingForm.data.company,
			first_name: shippingForm.data.first_name,
			last_name: shippingForm.data.last_name,
			address_1: shippingForm.data.address_1,
			address_2: shippingForm.data.address_2,
			city: shippingForm.data.city,
			country_code: shippingForm.data.country_code,
			province: shippingForm.data.province,
			postal_code: shippingForm.data.postal_code,
			phone: shippingForm.data.phone
		}
		// Check if billing_address different than shipping_address
		const billing_address = shippingForm.data.different_billing_address
			? {
					company: shippingForm.data.billing_company,
					first_name: shippingForm.data.billing_first_name,
					last_name: shippingForm.data.billing_last_name,
					address_1: shippingForm.data.billing_address_1,
					address_2: shippingForm.data.billing_address_2,
					city: shippingForm.data.billing_city,
					country_code: shippingForm.data.billing_country_code,
					province: shippingForm.data.billing_province,
					postal_code: shippingForm.data.billing_postal_code
			  }
			: shipping_address
		try {
			await medusa.carts.update(cartId, {
				context: {
					shipping_message: shippingForm.data.text
				},
				email: shippingForm.data.email,
				shipping_address,
				billing_address
			})
			return message(shippingForm, 'success')
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
	const shippingForm = await superValidate(shippingFormSchema)

	// Always return { shippingForm } in load AND shippingForm actions.
	return {
		shippingForm,
		regions
	}
}) satisfies PageServerLoad
