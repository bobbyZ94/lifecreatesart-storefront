import { directus } from '../../directus'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	return {
		gallery: (await directus
			.items('gallerie')
			.readByQuery({ limit: -1, fields: ['gallerie_bild.*.*'] })
			.then((res) => res.data)) as Gallery
	}
}) satisfies PageServerLoad
