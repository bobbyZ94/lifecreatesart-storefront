<script lang="ts">
	import { cartStore } from '../../../stores/cartStore'
	import { disabledButtonStore } from '../../../stores/disabledButtonStore'
	import { addToCart } from '$lib/shop/addToCart'
	import { removeFromCart } from '$lib/shop/removeFromCart'
	import { Drawer, CloseButton } from 'flowbite-svelte'
	import MinusCircleOutline from '~icons/mdi/minus-circle-outline'
	import PlusCircleOutline from '~icons/mdi/plus-circle-outline'
	import { sineIn } from 'svelte/easing'

	export let hiddenCart: boolean
	let step = 'cart'
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}
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

	<div class="flex flex-col items-center justify-center gap-3 py-5">
		<div class="font-permanent text-3xl font-bold uppercase md:mb-5 md:text-5xl">
			{step === 'cart' ? 'Shopping Cart' : 'Shipping'}
		</div>
		{#if $cartStore.items.length === 0}
			<div class="text-center">Cart is empty</div>
		{:else}
			{#each $cartStore.items as item}
				<div class="mt-3 flex w-2/3 flex-col items-center gap-3 border-b-2 border-gray-300 pb-3">
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
			<div class="mt-3">
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
			<div class="mt-5">
				<a href="/checkout" on:click={() => (hiddenCart = true)}>
					<button
						class="w-full max-w-md cursor-pointer justify-self-center rounded-xl bg-gray-700 p-2 text-center text-lg text-white duration-300 ease-in-out hover:bg-gray-800 focus:scale-105 md:text-xl"
						>Checkout</button
					>
				</a>
			</div>
		{/if}
	</div>
</Drawer>
