<script lang="ts">
	import Carousel from '../../../components/Shop/Carousel.svelte'
	import Textbox from '../../../components/Shop/Textbox.svelte'
	export let data
	const { product } = data
	const variant_id = product.variants[0].id
	const images = product.images
	const title = product.title
	const description = product.description
	const inventory = product.variants[0].inventory_quantity
	const price = product.variants[0].prices[0].amount
	const width = product.variants[0].width
	const height = product.variants[0].height
	const weight = product.variants[0].weight
</script>

<div class="my-20 max-w-7xl overflow-hidden rounded-lg p-5 drop-shadow-lg md:my-32">
	<div class="flex flex-col items-center">
		<Carousel {images} />
		<Textbox {variant_id} {title} {description} {inventory} {price} {width} {height} {weight} />
	</div>
</div>
