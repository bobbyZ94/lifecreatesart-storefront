import { persisted } from 'svelte-local-storage-store'

interface Cart {
	items: Item[]
	id: string
}

type Item = {
	title: string
	quantity: number
	price: number
}

export const cartStore = persisted<Cart>('cart', { items: [] })
