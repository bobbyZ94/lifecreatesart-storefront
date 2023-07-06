<script lang="ts">
	import Text from './Text.svelte'
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	export let block: Block_Text_Image
	let x: number
</script>

<svelte:window bind:innerWidth={x} />

<div class="grid h-full w-full grid-cols-1 gap-32 md:h-screen md:grid-cols-2 md:gap-5">
	<div class={`${x > 768 ? (block.flip_image ? 'order-1' : 'order-2') : null}`}>
		<Text {block} />
	</div>
	<div class={`${x > 768 ? (block.flip_image ? 'order-2' : 'order-1') : null}`}>
		<img
			src={`${PUBLIC_DIRECTUS_URL}/assets/${block.image.filename_disk}`}
			alt="Hero"
			class="h-full w-full rounded-full object-cover px-1 drop-shadow-lg"
		/>
	</div>
</div>
