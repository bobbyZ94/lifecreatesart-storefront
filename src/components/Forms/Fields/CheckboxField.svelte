<script lang="ts">
	import { Checkbox } from 'flowbite-svelte'
	import type { Writable } from 'svelte/store'
	import type { z, AnyZodObject } from 'zod'
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms'
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client'

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<ZodValidation<T>, unknown>
	export let field: FormPathLeaves<z.infer<T>>
	export let label: string

	const { value, errors, constraints } = formFieldProxy(form, field)

	$: boolValue = value as Writable<boolean>
</script>

<div>
	<Checkbox
		name={field}
		bind:checked={$boolValue}
		{...$constraints}
		{...$$restProps}
		class="text-xl"><span class="ml-1 text-base">{@html label}</span></Checkbox
	>
	{#if $errors}<span class="text-red-500">{$errors}</span>{/if}
</div>
