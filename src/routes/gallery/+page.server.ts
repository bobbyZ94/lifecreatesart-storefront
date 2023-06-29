import { directus } from '../../directus'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
    return {
        text: await directus.items('gallerie').readOne(1, {
            fields: ['bilder']
        }).then(({ text }) => text)
    };
}) satisfies PageServerLoad