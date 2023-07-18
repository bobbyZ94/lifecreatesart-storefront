<script lang="ts">
	import Carousel from '../../../components/Shop/Carousel.svelte'
	export let data
	const { product } = data
	const images = product.images
	const title = product.title
	const description = product.description
</script>

<div class="my-20 max-w-7xl overflow-hidden rounded-lg p-5 drop-shadow-lg">
	<div class="flex flex-col tracking-wider">
		<Carousel {images} />
		<div class="mt-12 text-2xl font-bold md:text-5xl">{title}</div>
		<div class="mt-6 text-xl md:text-2xl">{description}</div>
	</div>
</div>
