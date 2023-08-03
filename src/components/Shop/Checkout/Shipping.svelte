<script lang="ts">
	import { Input, Label, Textarea, Checkbox, Select } from 'flowbite-svelte'

	export let countries: any
	export let errors
	export let constraints
	export let form
	export let enhance: any
</script>

<form method="POST" action="?/addShippingAddress" use:enhance>
	<div class="flex flex-col gap-6 text-lg md:text-xl">
		<div class="text-3xl font-bold underline">Shipping Address</div>
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
			{#if $errors.company}
				<span class="text-sm text-red-700">{$errors.company}</span>
			{/if}
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
				{#if $errors.first_name}
					<span class="text-sm text-red-700">{$errors.first_name}</span>
				{/if}
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
				{#if $errors.last_name}
					<span class="text-sm text-red-700">{$errors.last_name}</span>
				{/if}
			</div>
		</div>
		<div>
			<Label for="address_1" class="mb-2 text-lg font-bold md:text-xl">Address 1 *</Label>
			<Input
				type="text"
				name="address_1"
				aria-invalid={$errors.address_1 ? 'true' : undefined}
				bind:value={$form.address_1}
				{...$constraints.address_1}
				class={`${$errors.address_1 ? 'border border-red-500' : ''} text-lg md:text-xl`}
			/>
			{#if $errors.address_1}
				<span class="text-sm text-red-700">{$errors.address_1}</span>
			{/if}
		</div>
		<div>
			<Label for="address_2" class="mb-2 text-lg font-bold md:text-xl">Address 2</Label>
			<Input
				type="text"
				name="address_2"
				aria-invalid={$errors.address_2 ? 'true' : undefined}
				bind:value={$form.address_2}
				{...$constraints.address_2}
				class={`${$errors.address_2 ? 'border border-red-500' : ''} text-lg md:text-xl`}
			/>
			{#if $errors.address_2}
				<span class="text-sm text-red-700">{$errors.address_2}</span>
			{/if}
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
				{#if $errors.postal_code}
					<span class="text-sm text-red-700">{$errors.postal_code}</span>
				{/if}
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
				{#if $errors.city}
					<span class="text-sm text-red-700">{$errors.city}</span>
				{/if}
			</div>
		</div>
		<div class="grid gap-6 md:grid-cols-5">
			<div class="md:col-span-3">
				<Label for="province" class="mb-2 text-lg font-bold md:text-xl">Province</Label>
				<Input
					type="text"
					name="address_2"
					aria-invalid={$errors.province ? 'true' : undefined}
					bind:value={$form.province}
					{...$constraints.province}
					class={`${$errors.province ? 'border border-red-500' : ''} text-lg md:text-xl`}
				/>
				{#if $errors.province}
					<span class="text-sm text-red-700">{$errors.province}</span>
				{/if}
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
				{#if $errors.country_code}
					<span class="text-sm text-red-700">{$errors.country_code}</span>
				{/if}
			</div>
		</div>
		<div>
			<Label for="email" class="mb-2 text-lg font-bold md:text-xl">Email *</Label>
			<Input
				type="text"
				name="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
				class={`${$errors.email ? 'border border-red-500' : ''} text-lg md:text-xl`}
			/>
			{#if $errors.email}
				<span class="text-sm text-red-700">{$errors.email}</span>
			{/if}
		</div>
		<div>
			<Checkbox bind:checked={$form.different_billing_address} class="text-xl">
				<span class="ml-3 text-base">Use a different address as billing address</span>
			</Checkbox>
		</div>
		{#if $form.different_billing_address}
			<div class="text-3xl font-bold underline">Billing Address</div>
			<div>
				<Label for="billing_company" class="mb-2 text-lg font-bold md:text-xl">Company</Label>
				<Input
					type="text"
					name="billing_company"
					aria-invalid={$errors.billing_company ? 'true' : undefined}
					bind:value={$form.billing_company}
					{...$constraints.billing_company}
					class={`${$errors.billing_company ? 'border border-red-500' : ''} text-lg md:text-xl`}
				/>
				{#if $errors.billing_company}
					<span class="text-sm text-red-700">{$errors.billing_company}</span>
				{/if}
			</div>
			<div class="grid gap-6 md:grid-cols-5">
				<div class="w-full md:col-span-2">
					<Label for="billing_first_name" class="mb-2 text-lg font-bold md:text-xl"
						>First Name *</Label
					>
					<Input
						type="text"
						name="billing_first_name"
						aria-invalid={$errors.billing_first_name ? 'true' : undefined}
						bind:value={$form.billing_first_name}
						{...$constraints.billing_first_name}
						class={`${
							$errors.billing_first_name ? 'border border-red-500' : ''
						} text-lg md:text-xl`}
					/>
					{#if $errors.billing_first_name}
						<span class="text-sm text-red-700">{$errors.billing_first_name}</span>
					{/if}
				</div>
				<div class="w-full md:col-span-3">
					<Label for="billing_last_name" class="mb-2 text-lg font-bold md:text-xl"
						>Last Name *</Label
					>
					<Input
						type="text"
						name="billing_last_name"
						aria-invalid={$errors.billing_last_name ? 'true' : undefined}
						bind:value={$form.billing_last_name}
						{...$constraints.billing_last_name}
						class={`${$errors.billing_last_name ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
					{#if $errors.billing_last_name}
						<span class="text-sm text-red-700">{$errors.billing_last_name}</span>
					{/if}
				</div>
			</div>
			<div>
				<Label for="billing_address_1" class="mb-2 text-lg font-bold md:text-xl">Address 1 *</Label>
				<Input
					type="text"
					name="billing_address_1"
					aria-invalid={$errors.billing_address_1 ? 'true' : undefined}
					bind:value={$form.billing_address_1}
					{...$constraints.billing_address_1}
					class={`${$errors.billing_address_1 ? 'border border-red-500' : ''} text-lg md:text-xl`}
				/>
				{#if $errors.billing_address_1}
					<span class="text-sm text-red-700">{$errors.billing_address_1}</span>
				{/if}
			</div>
			<div>
				<Label for="billing_address_2" class="mb-2 text-lg font-bold md:text-xl">Address 2</Label>
				<Input
					type="text"
					name="billing_address_2"
					aria-invalid={$errors.billing_address_2 ? 'true' : undefined}
					bind:value={$form.billing_address_2}
					{...$constraints.billing_address_2}
					class={`${$errors.billing_address_2 ? 'border border-red-500' : ''} text-lg md:text-xl`}
				/>
				{#if $errors.billing_address_2}
					<span class="text-sm text-red-700">{$errors.billing_address_2}</span>
				{/if}
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<div>
					<Label for="billing_postal_code" class="mb-2 text-lg font-bold md:text-xl"
						>Postal Code *</Label
					>
					<Input
						type="text"
						name="billing_postal_code"
						aria-invalid={$errors.billing_postal_code ? 'true' : undefined}
						bind:value={$form.billing_postal_code}
						{...$constraints.billing_postal_code}
						class={`${
							$errors.billing_postal_code ? 'border border-red-500' : ''
						} text-lg md:text-xl`}
					/>
					{#if $errors.billing_postal_code}
						<span class="text-sm text-red-700">{$errors.billing_postal_code}</span>
					{/if}
				</div>
				<div>
					<Label for="billing_city" class="mb-2 text-lg font-bold md:text-xl">City *</Label>
					<Input
						type="text"
						name="billing_city"
						aria-invalid={$errors.billing_city ? 'true' : undefined}
						bind:value={$form.billing_city}
						{...$constraints.billing_city}
						class={`${$errors.billing_city ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
					{#if $errors.billing_city}
						<span class="text-sm text-red-700">{$errors.billing_city}</span>
					{/if}
				</div>
			</div>
			<div class="grid gap-6 md:grid-cols-5">
				<div class="md:col-span-3">
					<Label for="billing_province_2" class="mb-2 text-lg font-bold md:text-xl">Province</Label>
					<Input
						type="text"
						name="billing_province_2"
						aria-invalid={$errors.billing_province ? 'true' : undefined}
						bind:value={$form.billing_province}
						{...$constraints.billing_rovince}
						class={`${$errors.billing_province ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
					{#if $errors.billing_province}
						<span class="text-sm text-red-700">{$errors.billing_province}</span>
					{/if}
				</div>
				<div class="md:col-span-2">
					<Label for="billing_country_code" class="mb-2 text-lg font-bold md:text-xl">Country</Label
					>
					<Select
						type="text"
						name="billing_country_code"
						aria-invalid={$errors.billing_country_code ? 'true' : undefined}
						bind:value={$form.billing_country_code}
						items={countries}
						{...$constraints.billing_country_code}
						class={`${
							$errors.billing_country_code ? 'border border-red-500' : ''
						} text-lg md:text-xl`}
					/>
					{#if $errors.billing_country_code}
						<span class="text-sm text-red-700">{$errors.billing_country_code}</span>
					{/if}
				</div>
			</div>
		{/if}
		<div class="">
			<Label for="text" class="mb-2 text-xl font-bold">Message</Label>
			<Label for="text" class="mb-2 text-sm font-bold text-gray-500"
				>Do you have additional information for your order?</Label
			>
			<Textarea
				rows="5"
				type="text"
				name="text"
				aria-invalid={$errors.text ? 'true' : undefined}
				bind:value={$form.text}
				{...$constraints.text}
				class={`${$errors.text ? 'border border-red-500' : ''} text-lg md:text-xl`}
			/>
			{#if $errors.text}
				<span class="text-sm text-red-700">{$errors.text}</span>
			{/if}
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
					class="w-full max-w-md cursor-pointer justify-self-center rounded-xl bg-gray-700 p-2 text-center text-lg text-white duration-300 ease-in-out hover:bg-gray-800 focus:scale-105 md:text-xl"
				>
					Payment
				</div></button
			>
		</div>
	</div>
</form>
