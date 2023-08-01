import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

interface Cart {
	items: Item[]
	id: string
	total?: number
	tax_total?: number
	shipping_address?: object
}

interface Item {
	title: string
	quantity: number
	variant: Variant
	id: string
	thumbnail: string
	created_at: string
}

interface Variant {
	id: string
	product: Product
}

interface Product {
	handle: string
}

export const cartStore: Writable<Cart> = writable({ id: '', items: [] })
