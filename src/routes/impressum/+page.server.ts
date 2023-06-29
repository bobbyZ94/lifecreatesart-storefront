import { directus } from '../../directus';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        text: await directus.items('impressum').readOne(1, {
            fields: ['text']
        }).then(({ text }) => text)
    };
}) satisfies PageServerLoad;