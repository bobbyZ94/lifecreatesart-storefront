import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

// Is the addToCart button disabled?
export const disabledButtonStore: Writable<boolean> = writable(false)
