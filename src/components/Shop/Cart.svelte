<script lang="ts">
	import { cartStore } from '../../stores/cartStore'
	import { disabledButtonStore } from '../../stores/disabledButtonStore'
	import { createCart } from '$lib/shop/createCart'
	import { retrieveCart } from '$lib/shop/retrieveCart'
	import { addToCart } from '$lib/shop/addToCart'
	import { removeFromCart } from '$lib/shop/removeFromCart'
	import { Drawer, CloseButton, Indicator } from 'flowbite-svelte'
	import MinusCircleOutline from '~icons/mdi/minus-circle-outline'
	import PlusCircleOutline from '~icons/mdi/plus-circle-outline'
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

	$: console.log($cartStore)
	// Keep cart state items sorted by created at
	$: $cartStore.items.sort((a, b) => {
		return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	})
</script>

<Drawer
	transitionType="fly"
	{transitionParams}
	bind:hidden={hiddenCart}
	id="cart"
	class="w-full md:w-4/5 xl:w-3/5"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (hiddenCart = true)} class="mb-4 dark:text-white" />
	</div>
	<div class="flex flex-col items-center justify-center gap-3">
		{#if $cartStore.items.length === 0}
			<div class="text-center">Cart is empty</div>
		{:else}
			<!-- <ol class="flex items-center justify-between">
				<li class="relative mb-6 w-full">
					<div class="flex items-center">
						<Indicator
							size="xl"
							color="none"
							class="z-10 shrink-0 bg-red-200 ring-0 ring-white  sm:ring-8"
						>
							<svg
								aria-hidden="true"
								class="h-4 w-4 text-red-600"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg
							>
						</Indicator>
						<div class="flex h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
					</div>
				</li>
				<li class="relative mb-6 w-full">
					<div class="flex items-center">
						<Indicator
							size="xl"
							color="none"
							class="z-10 shrink-0 bg-red-200 ring-0 ring-white  sm:ring-8"
						>
							<svg
								aria-hidden="true"
								class="h-4 w-4 text-red-600"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg
							>
						</Indicator>
						<div class="flex h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
					</div>
				</li>
				<li class="relative mb-6 w-full">
					<div class="flex items-center">
						<Indicator
							size="xl"
							color="none"
							class="z-10 shrink-0 bg-red-200 ring-0 ring-white  sm:ring-8"
						>
							<svg
								aria-hidden="true"
								class="h-4 w-4 text-red-600"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/></svg
							>
						</Indicator>
						<div class="flex h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
					</div>
				</li>
			</ol> -->
			<div class="flex w-full justify-center bg-blue-500">
				<ol class="flex w-full flex-grow items-center justify-center">
					<li class="mb-6 w-full">
						<div class="flex items-center">
							<Indicator
								size="xl"
								color="none"
								class="z-10 shrink-0 bg-primary-200 ring-0 ring-white dark:bg-primary-900 dark:ring-gray-900 sm:ring-8"
							>
								<svg
									aria-hidden="true"
									class="h-4 w-4 text-primary-600 dark:text-primary-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/></svg
								>
							</Indicator>
							<div class="flex h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
						</div>
						<div class="mt-3">
							<h3 class="font-medium text-gray-900 dark:text-white">Step 1</h3>
						</div>
					</li>
					<li class="relative mb-6 w-full">
						<div class="flex items-center">
							<Indicator
								size="xl"
								color="none"
								class="z-10 shrink-0 bg-primary-200 ring-0 ring-white dark:bg-primary-900 dark:ring-gray-900 sm:ring-8"
							>
								<svg
									aria-hidden="true"
									class="h-4 w-4 text-primary-600 dark:text-primary-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/></svg
								>
							</Indicator>
							<div class="flex h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
						</div>
						<div class="mt-3">
							<h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
						</div>
					</li>
					<li class="relative mb-6 w-full">
						<div class="flex items-center">
							<Indicator
								size="xl"
								color="none"
								class="z-10 shrink-0 bg-primary-200 ring-0 ring-white dark:bg-primary-900 dark:ring-gray-900 sm:ring-8"
							>
								<svg
									aria-hidden="true"
									class="h-4 w-4 text-primary-600 dark:text-primary-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/></svg
								>
							</Indicator>
							<div class="flex h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
						</div>
						<div class="mt-3">
							<h3 class="font-medium text-gray-900 dark:text-white">Step 2</h3>
						</div>
					</li>
					<li class="relative mb-6 w-full">
						<div class="flex items-center">
							<Indicator
								size="xl"
								color="gray"
								class="z-10 shrink-0 ring-0 ring-white dark:bg-gray-700 dark:ring-gray-900 sm:ring-8"
							>
								<svg
									aria-hidden="true"
									class="h-3 w-3 text-gray-800 dark:text-gray-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</Indicator>
						</div>
						<div class="mt-3">
							<h3 class="font-medium text-gray-900 dark:text-white">Step 3</h3>
						</div>
					</li>
				</ol>
			</div>

			{#each $cartStore.items as item}
				<div class="flex w-2/3 flex-col items-center gap-3 border-b-2 border-gray-300 pb-3">
					<a
						data-sveltekit-reload
						href={`/shop/${item.variant.product.handle}`}
						on:click={() => (hiddenCart = true)}
						class="h-full w-[12rem]"
					>
						<img
							src={item.thumbnail || '/images/no-image.png'}
							alt={item.title}
							class="h-full w-full object-contain"
						/>
					</a>
					<div>
						{item.title}
					</div>
					<div class="flex gap-2">
						<button
							disabled={$disabledButtonStore}
							on:click={() => {
								$disabledButtonStore = true
								removeFromCart(item.variant.id)
							}}
						>
							<MinusCircleOutline class="text-xl text-gray-600" />
						</button>

						{item.quantity + ' x'}

						<button
							disabled={$disabledButtonStore}
							on:click={() => {
								$disabledButtonStore = true
								addToCart(item.variant.id)
							}}
						>
							<PlusCircleOutline class="text-xl text-gray-600" />
						</button>
					</div>
				</div>
			{/each}
			<div>
				Tax: {$cartStore.tax_total && $cartStore.tax_total > 0
					? new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(
							$cartStore.tax_total / 100
					  )
					: '€0,00'}
			</div>
			<div class="text-lg tracking-wider">
				Total: {$cartStore.total &&
					new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(
						$cartStore.total / 100
					)}
			</div>
			<div>
				<button />
			</div>
		{/if}
	</div>
</Drawer>
