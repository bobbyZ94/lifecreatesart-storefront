import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

interface Cart {
	items: Item[]
	id: string
}

interface Item {
	title: string
	quantity: number
	variant: Variant
	id: string
}

interface Variant {
	id: string
}

export const cartStore: Writable<Cart> = writable({ id: '', items: [] })
