import { Directus } from '@directus/sdk'
import { PUBLIC_DIRECTUS_URL } from '$env/static/public'

export const directus = new Directus<Collections>(PUBLIC_DIRECTUS_URL)
