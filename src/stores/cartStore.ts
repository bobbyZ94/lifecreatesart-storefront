import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

interface Cart {
	items: Item[]
	id: string
	quantity?: number
}

interface Item {
	title: string
}

export const cartStore: Writable<Cart> = writable({ id: '', items: [] })
