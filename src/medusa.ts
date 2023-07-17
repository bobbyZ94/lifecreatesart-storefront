import Medusa from '@medusajs/medusa-js'
import { env } from '$env/dynamic/private'

export const medusa = new Medusa({
	maxRetries: 3,
	baseUrl: env.MEDUSA_URL,
	publishableApiKey: env.MEDUSA_ADMIN_API_KEY
})
