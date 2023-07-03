import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

// Is the header visible?
export const storeVisibleHeader: Writable<boolean> = writable(true)
