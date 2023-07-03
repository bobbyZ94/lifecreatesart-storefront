import { directus } from '../directus'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	return {
		frontpage: (await directus
			.items('frontpage')
			.readByQuery({ limit: -1, fields: ['components.collection', 'components.item.*.*'] })
			.then((res) => res.data)) as Frontpage
	}
}) satisfies PageServerLoad
