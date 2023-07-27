import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

interface Cart {
	items: Item[]
	id: string
}

interface Item {
	title: string
	quantity: number
}

export const cartStore: Writable<Cart> = writable({ id: '', items: [] })
