<script lang="ts">
	import { Card } from 'flowbite-svelte'
	export let data
	$: console.log(data)
</script>

<div class="my-20 max-w-7xl overflow-hidden rounded-lg p-5 drop-shadow-lg">
	<div class="grid items-center justify-center gap-12 md:grid-cols-2">
		{#each data.products as product}
			<Card href={`/shop/${product.handle}`} size="lg" class="flex h-full justify-center !p-0">
				<img
					src={product.thumbnail || '/images/no-image.png'}
					alt={product.title}
					class="h-[20rem] w-full rounded-lg object-cover md:h-[30rem]"
				/>
				<div class="p-5">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{product.title}
					</h5>
					<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
						{product.description}
					</p>
				</div>
			</Card>
		{/each}
		<Card href={`/contact`} size="lg" class="flex h-full justify-center !p-0">
			<img
				src="/images/empty-painting.jpg"
				alt="Empty painting"
				class="h-[20rem] w-full rounded-lg object-cover md:h-[30rem]"
			/>
			<div class="p-5">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Custom Painting
				</h5>
				<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
					Contact me for a custom painting, tailored to your wishes!
				</p>
			</div>
		</Card>
	</div>
</div>
