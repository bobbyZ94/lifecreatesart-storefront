<script lang="ts">
	import { Select, Label } from 'flowbite-svelte'
	import type { z, AnyZodObject } from 'zod'
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms'
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<ZodValidation<T>, unknown>
	export let field: FormPathLeaves<z.infer<T>>
	export let label: string
	export let items: { value: string; name: string }[]

	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<div>
	<Label class="text-lg font-bold md:text-xl">{label}</Label>

	<Select
		name={field}
		type="text"
		aria-invalid={$errors ? 'true' : undefined}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
		{items}
		placeholder="Choose ..."
		class="text-xl"
	/>

	{#if $errors}<span class="text-red-500">{$errors}</span>{/if}
</div>
