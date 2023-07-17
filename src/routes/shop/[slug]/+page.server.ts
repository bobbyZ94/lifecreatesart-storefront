import { medusa } from '../../../medusa'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const handle = params.slug
	return {
		product: await medusa.products
			.list({
				handle
			})
			.then(({ products }) => {
				if (!products.length) {
					// product does not exist
				}
				const product = products[0]
				return product
			})
	}
}) satisfies PageServerLoad
