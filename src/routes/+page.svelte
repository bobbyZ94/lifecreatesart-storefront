<script lang="ts">
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	export let data
	console.log(data)
</script>

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
		<div>
			<img
				src={`${PUBLIC_DIRECTUS_URL}/assets/${component.item.image.filename_disk}`}
				alt="Hero"
				class="h-full max-w-full rounded object-cover drop-shadow-lg"
			/>
		</div>
		<!-- {:else if component.collection === 'block_text'}
	{:else if component.collection === 'block_text_image'} -->
	{/if}
{/each}
