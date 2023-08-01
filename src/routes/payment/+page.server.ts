import { medusa } from '../../medusa'
import type { PageServerLoad, Actions } from './$types'

export const actions = {
	payment: async ({ request }) => {}
} satisfies Actions

export const load = (async ({ params }) => {}) satisfies PageServerLoad
