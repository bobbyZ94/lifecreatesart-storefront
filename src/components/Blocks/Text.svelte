<script lang="ts">
	import { GradientButton } from 'flowbite-svelte'
	export let block: Block_Text
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-5 p-5 md:h-screen">
	{#if block.title}
		<div class="font-playfair text-3xl font-bold tracking-wider md:text-6xl">
			{block.title}
		</div>
	{/if}
	{#if block.text}
		<div
			class="prose-blockquote: prose prose-xl text-center md:prose-2xl prose-blockquote:border-l-gray-500"
		>
			{@html block.text}
		</div>
	{/if}
	{#if block.button}
		<div class="flex gap-4">
			{#each block.button as button}
				<a href={button.item.url}>
					<button
						class="rounded-xl bg-gray-800 px-3 py-2 text-lg text-white drop-shadow-2xl duration-300 ease-in-out hover:scale-105 md:text-2xl"
						>{button.item.name}</button
					>
				</a>
			{/each}
		</div>
	{/if}
</div>
