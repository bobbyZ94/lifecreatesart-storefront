import { directus } from '../../directus'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { createTransport, type Transporter } from 'nodemailer'
import type { PageServerLoad, Actions } from './$types'

const schema = z.object({
	name: z.string(),
	email: z.string(),
	text: z.string(),
	conditions: z.string()
})

let transport: Transporter

export const actions = {
	default: async ({ request }) => {
		// Get form (already validated on client side with browser validation)
		const form = await superValidate(request, schema)

		// Create nodemailer transporter
		if (!transport) {
			transport = createTransport(
				{
					host: 'mail.privateemail.com',
					port: 587,
					secure: false, // true for 465, false for other ports
					auth: {
						user: 'info@lifecreates.art',
						pass: 'aDJlGgYR4buFL6rTslt0'
					}
				},
				{
					from: 'contactform@lifecreates.art' // sender address
				}
			)

			// Send mail
			try {
				await transport.sendMail({
					to: 'info@lifecreates.art', // just the one person who's getting this email
					subject: 'Nachricht von Lifecreatesart Homepage', // Subject line
					text: `Eine Nachricht von ${form.data.name} mit der E-Mail Adresse ${form.data.email}.`, // plain text body
					html: `<p>Name: ${form.data.name}</p><p>Email: ${form.data.email}</p><p>${form.data.text}</p>` // html body
				})
				return { success: 'Message sent successfully!' }
			} catch (error) {
				console.log(error)
				return {
					error: `ERROR: Message delivery failed due to error. Please try again later or write me an email.`
				}
			}
		}
	}
} satisfies Actions

export const load = (async ({ params }) => {
	return {
		contact: (await directus.singleton('kontakt').read()) as Kontakt
	}
}) satisfies PageServerLoad
