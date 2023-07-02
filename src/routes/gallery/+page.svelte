<script lang="ts">
	import { Gallery } from 'flowbite-svelte'
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	import Modal from '../../components/Gallery/Modal.svelte'
	export let data

	// Modal data
	const imageData = data.gallery.gallerie_bild
	let imageModal = false
	let imageSrc = ''
	let imageAlt: string | undefined = ''

	$: imageDescription = imageSrc
		? imageData.filter((image) => image.item.gallerie_bild === imageSrc)[0].item
				.gallerie_bild_beschreibung
		: ''

	const images: { src: string; alt: string }[] = []

	const masonry_columns = 3

	imageData.forEach((item: any) => {
		images.push({
			src: item.item.gallerie_bild,
			alt: item.item.gallerie_bild_name
		})
	})

	const masonry_images = images.reduce(
		(
			resultArray: { src: string; alt: string }[][],
			item: { src: string; alt: string },
			index: number
		) => {
			const chunkIndex = Math.floor(index / masonry_columns)

			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []
			}

			resultArray[chunkIndex].push(item)

			return resultArray
		},
		[]
	)
</script>

<Gallery class="grid-cols-1 gap-5 md:grid-cols-3">
	{#each masonry_images as column}
		<Gallery items={column} let:item>
			<button
				on:click={() => {
					imageModal = true
					imageAlt = item.alt
					imageSrc = item.src
				}}
			>
				<img
					src={`${PUBLIC_DIRECTUS_URL}/assets/${item.src}`}
					alt={item.alt}
					class="h-full max-w-full rounded object-cover drop-shadow-lg"
				/>
			</button>
		</Gallery>
	{/each}
</Gallery>

{#if imageModal}
	<Modal bind:imageModal {imageAlt} {imageDescription} {imageSrc} />
{/if}
