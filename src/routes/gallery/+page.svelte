<script lang="ts">
	import { Gallery } from 'flowbite-svelte'
	import { fade } from 'svelte/transition'
	import Close from '~icons/mdi/close-circle-outline'
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
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
	<button
		transition:fade={{ duration: 300 }}
		on:click|self={() => (imageModal = false)}
		class="fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-black/80"
	>
		<button on:click|self={() => (imageModal = false)}>
			<Close class="fixed right-8 top-8 cursor-pointer text-white" style="font-size: 28px" />
		</button>
		<button
			on:click|self={() => (imageModal = false)}
			class="flex flex-col items-center justify-center gap-5"
		>
			<img
				src={`https://directus.lifecreates.art/assets/${imageSrc}`}
				alt={imageAlt}
				class="max-h-[40rem] max-w-[22rem] rounded drop-shadow-lg md:max-w-[33rem] lg:max-w-[44rem] xl:max-w-[55rem]"
			/>
			<div class="translate-x-2 translate-y-2 rounded bg-gray-400">
				<div class="max-w-fit -translate-x-2 -translate-y-2 rounded bg-white p-3 drop-shadow-lg">
					<div class="rounded font-bold uppercase underline underline-offset-4">
						{imageAlt}
					</div>
					<div class="prose prose-sm">
						{@html imageDescription}
					</div>
				</div>
			</div>
		</button>
	</button>
{/if}
