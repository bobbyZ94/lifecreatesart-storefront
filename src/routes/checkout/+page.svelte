<script lang="ts">
	import { Spinner } from 'flowbite-svelte'
	import { checkoutStepStore } from '../../stores/checkoutStepStore'
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import Shipping from '../../components/Shop/Checkout/Shipping.svelte'
	import { cartStore } from '../../stores/cartStore'
	export let data: PageData

	// Create regions array for country selector
	let countries: any = []
	data.regions[0].countries.forEach((country: any) =>
		countries.push({
			value: country.iso_2,
			name: country.display_name
		})
	)

	// Client superform api
	let error: string = ''
	const { form, enhance, errors, constraints, capture, restore, delayed } = superForm(data.form, {
		applyAction: true,
		invalidateAll: true,
		resetForm: false,
		clearOnSubmit: 'errors-and-message',
		multipleSubmits: 'prevent',
		onError({ result }) {
			error = result.error.message
		},
		onUpdated: ({ form }) => {
			if (form.message === 'success') {
				$checkoutStepStore = 'payment'
				goto('/payment')
			}
		}
	})
	// Snapshot form data
	export const snapshot = { capture, restore }
</script>

<div class="my-20 max-w-xl rounded-lg p-5 drop-shadow-md md:my-32">
	{#if $cartStore.items.length === 0}
		<div>Your cart is empty! Nothing to checkout...</div>
	{:else if $delayed}
		<Spinner color="blue" size="12" class="text-center" />
	{:else if error}
		<div class="text-xl">{error}</div>
	{:else}
		<Shipping {countries} {errors} {constraints} {form} {enhance} />
	{/if}
</div>
