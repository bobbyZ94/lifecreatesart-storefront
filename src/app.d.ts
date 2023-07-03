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

type Block_Link = {
	name: string
	url: string
}

type Image = {
	filename_disk: string
}

type Block_Hero = {
	title?: string
	subtitle?: string
	image: Image
}

type Block_Text = {
	title?: string
	text?: string
	button?: [Block_Link]
}

type Block_Text_Image = {
	title?: string
	text?: string
	button?: [Block_Link]
	flip_image?: boolean
	image: Image
}

type Components = {
	collection: string
	id: number
	item: Block_Text | Block_Text_Image | Block_Hero
}

type Frontpage = {
	components: [Components]
}

type Collections = {
	datenschutz: Privacy
	impressum: Impressum
	gallery: Gallery
	frontpage: Frontpage
}
