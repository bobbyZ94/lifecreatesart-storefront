<script lang="ts">
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	export let block: Block_Hero
</script>

<div class="relative h-screen w-full">
	<img
		src={`${PUBLIC_DIRECTUS_URL}/assets/${block.image.filename_disk}`}
		alt="Hero"
		class="h-full w-full rounded-full object-cover p-5 drop-shadow-lg md:h-screen"
	/>
	{#if block.title || block.subtitle}
		<div
			class="absolute left-[50%] top-[50%] flex w-4/5 -translate-x-[50%] -translate-y-[50%] flex-col gap-5 rounded-lg bg-white/70 p-2 text-center backdrop-blur-md md:p-5"
		>
			{#if block.title}
				<div class="font-playfair text-3xl font-bold tracking-wider md:text-6xl">
					{block.title}
				</div>
			{/if}
			{#if block.subtitle}
				<div class="text-xl md:text-2xl">
					{block.subtitle}
				</div>
			{/if}
		</div>
	{/if}
</div>
