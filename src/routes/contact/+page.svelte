<script lang="ts">
	import { Input, Label, Textarea, Checkbox, A, Spinner } from 'flowbite-svelte'
	import type { ActionData, Snapshot } from './$types'

	let formData = {
		name: '',
		email: '',
		text: '',
		conditions: false
	}

	export const snapshot: Snapshot = {
		capture: () => formData,
		restore: (value) => (formData = value)
	}
	export let data
	export let form: ActionData

	let disabled = false
</script>

<div class="my-20 max-w-5xl overflow-hidden rounded-lg p-5 drop-shadow-md">
	{#if form?.success}
		<div class="flex flex-col gap-3 text-center text-xl font-bold tracking-wide md:text-2xl">
			<div>{form.success}</div>
			<div>Thank you for contacting me.</div>
		</div>
	{:else if form?.error}
		{form.error}
	{:else}
		<div class="mb-12 text-center text-4xl font-bold md:text-6xl">Kontakt</div>
		<div
			class="prose-lg break-words p-2 text-center md:prose-2xl prose-h1:mt-0 prose-h2:mt-0 prose-h3:mt-0 prose-blockquote:border-l-gray-500 marker:prose-ol:text-black marker:prose-ul:text-black"
		>
			{@html data.contact.text}
		</div>
		<form method="POST">
			<div class="flex flex-col gap-6 text-lg md:text-xl">
				<div>
					<Label for="name" class="mb-2 text-lg font-bold md:text-xl">Name</Label>
					<Input
						type="text"
						name="name"
						minlength="2"
						maxlength="128"
						id="name"
						placeholder="Max Mustermann"
						required
						class="text-lg invalid:border-red-300 md:text-xl"
						bind:value={formData.name}
					/>
				</div>
				<div class="">
					<Label for="email" class="mb-2 text-lg font-bold md:text-xl">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						placeholder="max@mustermann.com"
						required
						class="text-lg md:text-xl"
						bind:value={formData.email}
					/>
				</div>
				<div class="">
					<Label for="text" class="mb-2 text-xl font-bold">Message</Label>
					<Textarea
						id="text"
						required
						name="text"
						type="text"
						rows="10"
						placeholder="Hello ..."
						class="text-lg md:text-xl"
						minlength="3"
						maxlength="3000"
						bind:value={formData.text}
					/>
				</div>
				<div class="text-xl">
					<Checkbox id="conditions" name="conditions" type="checkbox" required>
						I agree with the&nbsp
						<A
							href="/privacy#contactform"
							class="text-primary-700 hover:underline dark:text-primary-600"
						>
							terms and conditions.
						</A>
					</Checkbox>
				</div>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="mt-5 flex justify-center">
					<button type="submit" class="group rounded-xl bg-gray-400 text-lg text-white md:text-xl"
						><div
							class="h-full w-full rounded-xl p-2 drop-shadow-lg valid:bg-gray-800 valid:duration-300 valid:ease-in-out invalid:bg-gray-400 valid:group-hover:-translate-x-2 valid:group-hover:-translate-y-2"
						>
							Send message
						</div></button
					>
				</div>
			</div>
		</form>
	{/if}
</div>
