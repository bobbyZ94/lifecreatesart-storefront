<script lang="ts">
	import { cartStore } from '../../stores/cartStore'
	import { createCart } from '$lib/shop/createCart'
	import { retrieveCart } from '$lib/shop/retrieveCart'
	import { Drawer, CloseButton } from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	export let hiddenCart: boolean
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}

	// Create or get cart from server and sync with store state
	let id: string
	onMount(async () => {
		if (browser) {
			id = window.localStorage.getItem('cart_id') || ''
			console.log(id)
			if (!id) {
				const cart = await createCart()
				window.localStorage.setItem('cart_id', cart.id)
				$cartStore = cart
			} else {
				const cart = await retrieveCart(id)
				$cartStore = cart
			}
		}
	})
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenCart} id="cart">
	<div class="flex items-center">
		<CloseButton on:click={() => (hiddenCart = true)} class="mb-4 dark:text-white" />
	</div>
	<div class="flex flex-col items-center justify-center gap-3">
		{#if $cartStore.items.length === 0}
			<div class="text-center">Cart is empty</div>
		{:else}
			{#each $cartStore.items as item}
				<div>{item.title} x {item.quantity}</div>
			{/each}
		{/if}
	</div>
</Drawer>
