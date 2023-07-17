import { directus } from '../../directus'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { createTransport, type Transporter } from 'nodemailer'
import { error, fail } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import type { PageServerLoad, Actions } from './$types'

const schema = z.object({
	name: z.string().min(2).max(128),
	email: z.string(),
	text: z.string().min(2).max(2000),
	conditions: z.string()
})

let transport: Transporter

export const actions = {
	sendEmail: async ({ request }) => {
		// Serverside superform api
		const form = await superValidate(request, schema)

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form })
		}

		// Create mail transporter
		transport = createTransport(
			{
				host: env.MAIL_HOST,
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: env.MAIL_USER,
					pass: env.MAIL_PW
				}
			},
			{
				from: 'contactform@lifecreates.art'
			}
		)

		// Send mail
		try {
			await transport.sendMail({
				to: 'info@lifecreates.art',
				subject: 'Nachricht von Lifecreatesart Homepage',
				text: `Eine Nachricht von ${form.data.name} mit der E-Mail Adresse ${form.data.email}.`,
				html: `<p>Name: ${form.data.name}</p><p>Email: ${form.data.email}</p><p>${form.data.text}</p>`
			})
			// Return form if sending mail successfull. This starts the event onUpdated and enables success message.
			return { form }
		} catch (e) {
			console.log(e)
			// Throw error which gets picked up by onError and display error message.
			throw error(500, {
				message: 'Error while sending the message. Please try again later or write me an email.'
			})
		}
	}
} satisfies Actions

export const load = (async ({ params }) => {
	// Server API:
	const form = await superValidate(schema)

	// Always return { form } in load AND form actions.
	return {
		contact: (await directus.singleton('kontakt').read()) as Kontakt,
		form
	}
}) satisfies PageServerLoad
