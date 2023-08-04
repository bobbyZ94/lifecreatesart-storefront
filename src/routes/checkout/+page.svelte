<script lang="ts">
	import { cartStore } from '../../stores/cartStore'
	import ShippingForm from '../../components/Forms/ShippingForm.svelte'
	import type { PageData } from './$types'
	export let data: PageData
	console.log('CHECKOUT data', data)
</script>

<div class="my-20 max-w-xl rounded-lg p-5 drop-shadow-md md:my-32">
	{#if $cartStore.items.length === 0}
		<div>Your cart is empty! Nothing to checkout...</div>
	{:else}
		<ShippingForm data={data.shippingForm} regions={data.regions} />
	{/if}
</div>
