import { z } from 'zod'

export const shippingFormSchema = z.object({
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
	different_billing_address: z.boolean().optional(),
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
	shipping_message: z
		.string()
		.min(1, { message: 'Must have atleast 1 chracter' })
		.max(2000, { message: 'Must be 2000 or fewer characters long' })
		.optional(),
	terms: z.literal(true, {
		errorMap: () => ({ message: 'You must accept the terms & conditions' })
	})
})

export type ShippingFormSchema = typeof shippingFormSchema
