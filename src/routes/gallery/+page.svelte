<script lang="ts">
	import { Gallery } from 'flowbite-svelte'
	import { Modal } from 'flowbite-svelte'
	import { fade } from 'svelte/transition'
	import Close from '~icons/mdi/close-circle-outline'
	export let data

	// Modal data
	let imageModal = false
	let imageSrc = ''
	let imageAlt: string | undefined = ''
	let imageDescription = ''

	const images: { src: string; alt: string }[] = []

	const masonry_columns = 3

	data.gallery.gallerie_bild.forEach((item: any) => {
		images.push({
			src: `https://directus.lifecreates.art/assets/${item.item.gallerie_bild}`,
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
				resultArray[chunkIndex] = [] // start a new chunk
			}

			resultArray[chunkIndex].push(item)

			return resultArray
		},
		[]
	)
	console.log(masonry_images)
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
					src={item.src}
					alt={item.alt}
					class="h-full max-w-full rounded object-cover drop-shadow-lg"
				/>
			</button>
		</Gallery>
	{/each}
</Gallery>

{#if imageModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		transition:fade={{ duration: 300 }}
		on:click|self={() => (imageModal = false)}
		class="fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-black/80"
	>
		<Close class="fixed right-10 top-10 text-white" style="font-size: 28px" />

		<img src={imageSrc} alt={imageAlt} class="max-h-[80%] max-w-[80%]" />
	</div>
{/if}
