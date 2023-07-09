<script lang="ts">
	export let block: Block_Text
</script>

<div>
	<div
		class="flex h-full w-full flex-col items-center justify-center gap-5 p-5 text-center md:h-screen"
	>
		{#if block.title}
			<div class="font-playfair text-3xl font-bold tracking-wider md:text-6xl">
				{block.title}
			</div>
		{/if}
		{#if block.text}
			<div class="prose prose-xl p-2 md:prose-2xl prose-blockquote:border-l-gray-500">
				{@html block.text}
			</div>
		{/if}
		{#if block.button}
			<div class="flex gap-4">
				{#each block.button as button}
					<a href={button.item.url}>
						<button class="group rounded-xl bg-gray-400 text-lg text-white md:text-2xl"
							><div
								class="h-full w-full rounded-xl bg-gray-800 p-2 drop-shadow-lg duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2"
							>
								{button.item.name}
							</div></button
						>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
