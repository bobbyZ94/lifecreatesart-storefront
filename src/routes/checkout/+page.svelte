<script lang="ts">
	import { Input, Label, Textarea, Checkbox, Select, Spinner } from 'flowbite-svelte'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { onMount } from 'svelte'
	export let data: PageData

	// Create regions array for country selector
	let countries: any = []
	data.regions[0].countries.forEach((country: any) =>
		countries.push({
			value: country.id,
			name: country.display_name
		})
	)

	// Client superform api
	let success: boolean = false
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
		onUpdated: () => (success = true)
	})
	// Snapshot form data
	export const snapshot = { capture, restore }
</script>

<div class="my-20 max-w-xl overflow-hidden rounded-lg p-5 drop-shadow-md md:my-32">
	{#if $delayed}
		<Spinner color="blue" size="12" class="text-center" />
	{:else if error}
		<div class="text-xl">{error}</div>
	{:else}
		<form method="POST" action="?/addShippingAdress" use:enhance>
			<div class="flex flex-col gap-6 text-lg md:text-xl">
				<div>
					<Label for="company" class="mb-2 text-lg font-bold md:text-xl">Company</Label>
					<Input
						type="text"
						name="company"
						aria-invalid={$errors.company ? 'true' : undefined}
						bind:value={$form.company}
						{...$constraints.company}
						class={`${$errors.company ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
				</div>
				<div class="grid gap-6 md:grid-cols-5">
					<div class="w-full md:col-span-2">
						<Label for="first_name" class="mb-2 text-lg font-bold md:text-xl">First Name *</Label>
						<Input
							type="text"
							name="first_name"
							aria-invalid={$errors.first_name ? 'true' : undefined}
							bind:value={$form.first_name}
							{...$constraints.first_name}
							class={`${$errors.first_name ? 'border border-red-500' : ''} text-lg md:text-xl`}
						/>
					</div>
					<div class="w-full md:col-span-3">
						<Label for="last_name" class="mb-2 text-lg font-bold md:text-xl">Last Name *</Label>
						<Input
							type="text"
							name="last_name"
							aria-invalid={$errors.last_name ? 'true' : undefined}
							bind:value={$form.last_name}
							{...$constraints.last_name}
							class={`${$errors.last_name ? 'border border-red-500' : ''} text-lg md:text-xl`}
						/>
					</div>
				</div>
				<div>
					<Label for="adress_1" class="mb-2 text-lg font-bold md:text-xl">Adress 1 *</Label>
					<Input
						type="text"
						name="adress_1"
						aria-invalid={$errors.adress_1 ? 'true' : undefined}
						bind:value={$form.adress_1}
						{...$constraints.adress_1}
						class={`${$errors.adress_1 ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
				</div>
				<div>
					<Label for="adress_2" class="mb-2 text-lg font-bold md:text-xl">Adress 2</Label>
					<Input
						type="text"
						name="adress_2"
						aria-invalid={$errors.adress_2 ? 'true' : undefined}
						bind:value={$form.adress_2}
						{...$constraints.adress_2}
						class={`${$errors.adress_2 ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
				</div>
				<div class="grid gap-6 md:grid-cols-2">
					<div>
						<Label for="postal_code" class="mb-2 text-lg font-bold md:text-xl">Postal Code *</Label>
						<Input
							type="text"
							name="postal_code"
							aria-invalid={$errors.postal_code ? 'true' : undefined}
							bind:value={$form.postal_code}
							{...$constraints.postal_code}
							class={`${$errors.postal_code ? 'border border-red-500' : ''} text-lg md:text-xl`}
						/>
					</div>
					<div>
						<Label for="city" class="mb-2 text-lg font-bold md:text-xl">City *</Label>
						<Input
							type="text"
							name="city"
							aria-invalid={$errors.city ? 'true' : undefined}
							bind:value={$form.city}
							{...$constraints.city}
							class={`${$errors.city ? 'border border-red-500' : ''} text-lg md:text-xl`}
						/>
					</div>
				</div>
				<div class="grid gap-6 md:grid-cols-5">
					<div class="md:col-span-3">
						<Label for="province" class="mb-2 text-lg font-bold md:text-xl">Province</Label>
						<Input
							type="text"
							name="adress_2"
							aria-invalid={$errors.province ? 'true' : undefined}
							bind:value={$form.province}
							{...$constraints.province}
							class={`${$errors.province ? 'border border-red-500' : ''} text-lg md:text-xl`}
						/>
					</div>
					<div class="md:col-span-2">
						<Label for="country_code" class="mb-2 text-lg font-bold md:text-xl">Country *</Label>
						<Select
							type="text"
							name="country_code"
							aria-invalid={$errors.country_code ? 'true' : undefined}
							bind:value={$form.country_code}
							items={countries}
							{...$constraints.country_code}
							class={`${$errors.country_code ? 'border border-red-500' : ''} text-lg md:text-xl`}
						/>
					</div>
				</div>
				<div>
					<Label for="email" class="mb-2 text-lg font-bold md:text-xl">Email *</Label>
					<Input
						type="email"
						name="email"
						aria-invalid={$errors.email ? 'true' : undefined}
						bind:value={$form.email}
						{...$constraints.email}
						class={`${$errors.email ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
				</div>
				<div class="">
					<Label for="text" class="mb-2 text-xl font-bold">Message</Label>
					<Textarea
						rows="8"
						type="text"
						name="text"
						aria-invalid={$errors.text ? 'true' : undefined}
						bind:value={$form.text}
						{...$constraints.text}
						class={`${$errors.text ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
				</div>
				<div>
					<Checkbox
						type="checkbox"
						name="conditions"
						aria-invalid={$errors.conditions ? 'true' : undefined}
						value="agreed"
						{...$constraints.conditions}
						class="text-xl"
					>
						<span class="ml-3 text-base"
							>I agree with the <a
								href="/privacy#contactform"
								class="text-base text-primary-700 hover:underline dark:text-primary-600"
							>
								terms and conditions.
							</a></span
						>
					</Checkbox>
				</div>
				<div class="mt-5 flex justify-center">
					<button class="group rounded-xl bg-gray-400 text-lg text-white md:text-xl"
						><div
							class=":bg-gray-800 h-full w-full rounded-xl bg-gray-800 p-2 drop-shadow-lg duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2"
						>
							Payment
						</div></button
					>
				</div>
			</div>
		</form>
	{/if}
</div>
