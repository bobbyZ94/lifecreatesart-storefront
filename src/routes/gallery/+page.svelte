<script lang="ts">
	import { Gallery } from 'flowbite-svelte'
	export let data
	console.log(data)
	const images: any = []

	const masonry_columns = 3

	data.gallery.gallerie_bild.forEach((item: any) => {
		images.push({
			alt: item.item.gallerie_bild_name,
			src: `https://directus.lifecreates.art/assets/${item.item.gallerie_bild}`
		})
	})

	const masonry_images = images.reduce((resultArray: any, item: any, index: number) => {
		const chunkIndex = Math.floor(index / masonry_columns)

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [] // start a new chunk
		}

		resultArray[chunkIndex].push(item)

		return resultArray
	}, [])
	console.log(masonry_images)
</script>

<Gallery class="grid-cols-1 gap-5 md:grid-cols-3">
	{#each masonry_images as column}
		<Gallery items={column} let:item>
			<img
				src={item.src}
				alt={item.alt}
				class="object-cove h-full max-w-full rounded drop-shadow-lg"
			/>
		</Gallery>
	{/each}
</Gallery>
