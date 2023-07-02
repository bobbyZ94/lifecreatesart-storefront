import { directus } from '../../directus'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	return {
		privacy: (await directus.singleton('datenschutz').read()) as Privacy
	}
}) satisfies PageServerLoad
