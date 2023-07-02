// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

type Privacy = {
	text: string
}

type Impressum = {
	text: string
}

type Gallery = {
	gallerie_bild: [
		{
			collection: string
			id: number
			item: {
				id: number
				gallerie_bild: string
				gallerie_bild_beschreibung: string
				gallerie_bild_name: string
			}
		}
	]
}

type Collections = {
	datenschutz: Privacy
	impressum: Impressum
	gallery: Gallery
}
