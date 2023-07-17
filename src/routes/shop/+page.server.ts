import { medusa } from '../../medusa'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	return {
		products: (await medusa.products.list()).products
	}
}) satisfies PageServerLoad
