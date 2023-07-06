<script lang="ts">
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	import ArrowDown from '~icons/mdi/arrow-down'
	export let data
	let toggleArrowDown: boolean = false
	setTimeout(() => {
		toggleArrowDown = true
	}, 3000)
	console.log(data)
</script>

<div class="h-full w-full">
	<div class="relative flex h-screen w-full items-center justify-center md:p-5">
		<img src="images/logo.jpg" alt="Hero" class="h-full object-contain" />
		{#if toggleArrowDown}
			<div
				class="absolute bottom-[3rem] transform animate-bounce duration-300 ease-in md:bottom-[3rem] md:left-auto md:right-[3rem]"
			>
				<ArrowDown style="font-size: 35px" />
			</div>
		{/if}
	</div>
	{#each data.frontpage.components as component}
		{#if component.collection === 'block_hero' && 'subtitle' in component.item}
			{#if component.item.title}
				<div>
					{component.item.title}
				</div>
			{/if}
			{#if component.item.subtitle}
				<div>
					{component.item.subtitle}
				</div>
			{/if}
			<div class="h-screen">
				<img
					src={`${PUBLIC_DIRECTUS_URL}/assets/${component.item.image.filename_disk}`}
					alt="Hero"
					class="h-full object-contain"
				/>
			</div>
			<!-- {:else if component.collection === 'block_text'}
		{:else if component.collection === 'block_text_image'} -->
		{/if}
	{/each}
</div>
