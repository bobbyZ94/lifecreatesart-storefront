<script lang="ts">
	export let data
	const { product } = data
	const title = product.title
	const description = product.description
	let currentImageIndex = 0
	$: console.log(currentImageIndex)
	$: currentImage = product.images![currentImageIndex].url || '/images/no-image.png'
</script>

<div class="my-20 w-full max-w-7xl rounded-lg p-5 drop-shadow-lg">
	<div class="flex h-full w-full flex-col items-center justify-center tracking-wider">
		<!-- Images Container -->

		<img src={currentImage} alt={title} class="h-[75vh] w-full object-contain" />
		{#if product.images && product.images.length > 0}
			<div class="w-ful flex h-full items-center justify-center">
				<div class="mt-3 flex w-full flex-wrap gap-3 xl:my-3">
					{#each product.images as image, indexImage}
						<button on:click={() => (currentImageIndex = indexImage)}>
							<img
								src={image.url}
								alt={product.title}
								class="h-[3rem] w-[4rem] object-contain drop-shadow lg:h-[8rem] lg:w-[10rem]"
							/>
						</button>
					{/each}
				</div>
			</div>
		{/if}
		<!-- Text Container -->
		<div class="p-3">
			<div class="mt-6 w-full text-2xl font-bold underline underline-offset-8 md:text-5xl">
				{title}
			</div>
			<div class="mt-6 grid w-full text-xl md:grid-cols-3 md:text-xl">
				<div class="w-full md:col-span-2 md:mr-8">{description}</div>
				<!-- Infobox Container -->
				<div class="flex flex-col gap-3">
					<div>Height x Width</div>
					<div>Weight</div>
					<div>Price</div>
				</div>
			</div>
			<button>Add to cart</button>
		</div>
	</div>
</div>
