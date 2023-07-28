import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

// Is the header visible?
export const visibleHeaderStore: Writable<boolean> = writable(true)
