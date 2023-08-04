<script lang="ts">
	import { Spinner } from 'flowbite-svelte'
	import { checkoutStepStore } from '../../stores/checkoutStepStore'
	import { superForm } from 'sveltekit-superforms/client'
	import { goto } from '$app/navigation'
	import TextField from './Fields/TextField.svelte'
	import CheckboxField from './Fields/CheckboxField.svelte'
	import type { ShippingFormSchema } from '$lib/schemas'
	import type { SuperValidated } from 'sveltekit-superforms'

	export let data: SuperValidated<ShippingFormSchema>
	export let regions: any

	// Create regions array for country selector
	let countries: any = []
	regions[0].countries.forEach((country: any) =>
		countries.push({
			value: country.iso_2,
			name: country.display_name
		})
	)

	// Client superform api
	let error: string = ''
	const form = superForm(data)
	const { enhance, errors, constraints, capture, restore, delayed } = superForm(data, {
		taintedMessage: null, // Because we have snapshots, we dont need a tainted message when user navigates away fromt he form!
		multipleSubmits: 'prevent',
		onError({ result }) {
			error = result.error.message
		},
		onUpdated: ({ form }) => {
			// On update check if form is validated correctly and navigate user to payment page
			if (form.message === 'success') {
				$checkoutStepStore = 'payment'
				goto('/payment')
			}
		}
	})
	// Snapshot form data for persistence if user navigates away
	export const snapshot = { capture, restore }
</script>

{#if $delayed}
	<Spinner color="blue" size="12" class="text-center" />
{:else if error}
	<div class="text-xl">{error}</div>
{:else}
	<form method="POST" action="?/addShippingAddress" use:enhance>
		<div class="flex flex-col gap-3 text-lg md:text-xl">
			<div class="mb-3 text-center text-3xl font-bold">Shipping Address</div>
			<TextField {form} field="company" label="Company" />
			<div class="grid gap-3 md:grid-cols-5">
				<div class="w-full md:col-span-2">
					<TextField {form} field="first_name" label="First Name *" />
				</div>
				<div class="w-full md:col-span-3">
					<TextField {form} field="last_name" label="Last Name *" />
				</div>
			</div>

			<TextField {form} field="address_1" label="Address *" />
			<TextField {form} field="address_2" label="Address" />
			<div class="grid gap-3 md:grid-cols-2">
				<TextField {form} field="postal_code" label="Postal Code" />
				<TextField {form} field="city" label="City" />
			</div>
			<div class="grid gap-3 md:grid-cols-5">
				<div class="md:col-span-3">
					<TextField {form} field="province" label="Province" />
				</div>
				<div class="md:col-span-2">
					<TextField {form} field="country_code" label="Country *" />
				</div>
			</div>
			<TextField {form} field="email" label="Email *" />
			<CheckboxField {form} field="terms" label="Use a different address as billing address" />
		</div>
	</form>
{/if}
