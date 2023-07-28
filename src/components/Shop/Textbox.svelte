<script lang="ts">
	import { addToCart } from '$lib/shop/addToCart'
	import { cartStore } from '../../stores/cartStore'
	export let inventory: number
	export let variant_id: string
	export let title: string
	export let description: string
	export let price: number
	export let width: number
	export let height: number
	export let weight: number
	// Check if quantity of item in cart is less or equal to inventory and disable addToCart button conditionally
	$: quantityInCart =
		$cartStore.items?.find((item) => item.variant.id === variant_id)?.quantity || 0
	$: outOfStock = quantityInCart >= inventory
	$: console.log('quantityInCart: ', quantityInCart)
	$: disabled = outOfStock || inventory === 0
	$: console.log('Inventory: ', inventory, 'outOfStock: ', outOfStock)
</script>

<div class="my-20 flex w-full max-w-5xl flex-col items-center gap-8">
	<div class="gapo-8 grid w-full md:grid-cols-3 md:gap-28">
		<div class="flex flex-col gap-6 md:col-span-2">
			<div class="break-words font-permanent text-4xl font-bold md:text-5xl">
				{title}
			</div>
			<div class="text-xl md:text-2xl">{description}</div>
		</div>
		<div class="md-cols-span-1 mt-8 flex flex-col gap-3 text-base md:text-xl">
			<div>Width: {width ? width : ' ?'}</div>
			<div>Height: {height ? height : ' ?'}</div>
			<div>Weight: {weight ? weight : ' ?'}</div>
		</div>
	</div>
	<div class="self-start text-base md:text-xl">{inventory} pcs. in stock.</div>
	<div class="self-start text-base md:text-xl">
		{new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(price / 100)}
	</div>
	<button
		on:click={() => {
			disabled = true
			addToCart(variant_id)
		}}
		{disabled}
		class={`${
			inventory === 0 || outOfStock ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'
		} w-full max-w-md justify-self-center rounded-xl p-2 text-center text-lg text-white md:text-2xl`}
	>
		{inventory === 0 || outOfStock ? 'Out of stock' : 'Add to cart'}
	</button>
</div>
