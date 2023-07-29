<script lang="ts">
	import { Input, Label, Textarea, Checkbox, A, Spinner } from 'flowbite-svelte'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'

	export let data: PageData

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

<div class="my-20 max-w-5xl overflow-hidden rounded-lg p-5 drop-shadow-md md:my-32">
	{#if success}
		<div class="text-xl">Message sent successfully.</div>
		<div class="text-xl">Thank you for contacting me!</div>
	{:else if $delayed}
		<Spinner color="blue" size="12" class="text-center" />
	{:else if error}
		<div class="text-xl">{error}</div>
	{:else}
		<div
			class="prose-lg break-words p-2 text-center md:prose-2xl prose-h1:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-blockquote:border-l-gray-500 marker:prose-ol:text-black marker:prose-ul:text-black"
		>
			{@html data.contact.text}
		</div>
		<form method="POST" action="?/sendEmail" use:enhance>
			<div class="flex flex-col gap-6 text-lg md:text-xl">
				<div>
					<Label for="name" class="mb-2 text-lg font-bold md:text-xl">Name</Label>
					<Input
						type="text"
						name="name"
						aria-invalid={$errors.name ? 'true' : undefined}
						bind:value={$form.name}
						{...$constraints.name}
						class={`${$errors.name ? 'border border-red-500' : ''} text-lg md:text-xl`}
					/>
				</div>
				<div class="">
					<Label for="email" class="mb-2 text-lg font-bold md:text-xl">Email</Label>
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
						<span class="text-base">I agree with the &nbsp</span>
						<span />
						<A
							href="/privacy#contactform"
							class="inline-block text-base text-primary-700 hover:underline dark:text-primary-600"
						>
							terms and conditions.
						</A>
					</Checkbox>
				</div>
				<div class="mt-5 flex justify-center">
					<button class="group rounded-xl bg-gray-400 text-lg text-white md:text-xl"
						><div
							class=":bg-gray-800 h-full w-full rounded-xl bg-gray-800 p-2 drop-shadow-lg duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2"
						>
							Send message
						</div></button
					>
				</div>
			</div>
		</form>
	{/if}
</div>
