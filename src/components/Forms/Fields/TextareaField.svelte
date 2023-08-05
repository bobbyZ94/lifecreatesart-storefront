<script lang="ts">
	import { Textarea, Label } from 'flowbite-svelte'
	import type { z, AnyZodObject } from 'zod'
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms'
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<ZodValidation<T>, unknown>
	export let field: FormPathLeaves<z.infer<T>>
	export let label: string
	export let hintLabel: string | undefined = undefined
	export let rows: number

	const { value, errors, constraints } = formFieldProxy(form, field)
</script>

<div>
	<Label class="text-lg font-bold md:text-xl">{label}</Label>
	{#if hintLabel}
		<Label for="text" class="mb-2 text-sm font-bold text-gray-500">{@html hintLabel}</Label>
	{/if}
	<Textarea
		{rows}
		name={field}
		type="text"
		aria-invalid={$errors ? 'true' : undefined}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
		class="text-xl"
	/>

	{#if $errors}<span class="text-red-500">{$errors}</span>{/if}
</div>
