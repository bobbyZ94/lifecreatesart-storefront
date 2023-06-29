import { Directus } from '@directus/sdk'
import { DIRECTUS_URL } from '$env/static/private'

export const directus = new Directus(DIRECTUS_URL)