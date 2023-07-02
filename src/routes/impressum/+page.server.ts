import { directus } from '../../directus'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	return {
		impressum: (await directus.singleton('impressum').read()) as Impressum
	}
}) satisfies PageServerLoad
