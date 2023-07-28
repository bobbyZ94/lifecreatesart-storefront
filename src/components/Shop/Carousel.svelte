<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte'
	import ChevronLeftCircle from '~icons/mdi/chevron-left-circle'
	import ChevronRightCircle from '~icons/mdi/chevron-right-circle'
	export let images: any

	let emblaApi: any
	const options = { loop: true }
	const plugins: any[] = []

	const onInit = (event: any) => {
		emblaApi = event.detail
	}

	let markedIndicator: number = 0
	function scrollNext() {
		if (emblaApi) {
			if (markedIndicator === images.length - 1) {
				markedIndicator = 0
				emblaApi.scrollTo(markedIndicator)
			} else {
				markedIndicator++
				emblaApi.scrollTo(markedIndicator)
			}
		}
	}
	function scrollPrev() {
		if (emblaApi) {
			if (markedIndicator === 0) {
				markedIndicator = images.length - 1
				emblaApi.scrollTo(markedIndicator)
			} else {
				markedIndicator--
				emblaApi.scrollTo(markedIndicator)
			}
		}
	}

	function scrollToSlide(index: number) {
		if (emblaApi) {
			markedIndicator = index
			emblaApi.scrollTo(index)
		}
	}
</script>

<div class="embla relative">
	<div class="embla__viewport" use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={onInit}>
		<div class="embla__container">
			{#each images as image}
				<div class="embla__slide">
					<img src={image.url} alt="product" class="h-[40vh] w-full object-contain md:h-[60vh]" />
				</div>
			{/each}
		</div>
	</div>
	{#if images.length > 1}
		<button on:click={scrollPrev} class="absolute bottom-[45%] left-1 text-slate-600"
			><ChevronLeftCircle style="font-size: 28px" /></button
		>
		<button on:click={scrollNext} class="absolute bottom-[45%] right-1 text-slate-600"
			><ChevronRightCircle style="font-size: 28px" /></button
		>
	{/if}
</div>
{#if images.length > 1}
	<div class="flex h-full w-full items-center justify-center gap-4">
		{#each images as image, index}
			<button
				class={`${
					index === markedIndicator ? 'border-slate-800' : 'border-slate-400'
				} w-5 cursor-pointer border-b-[6px] `}
				on:click={() => scrollToSlide(index)}>&nbsp</button
			>
		{/each}
	</div>
{/if}

<style>
	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 100%; /* Each slide covers 80% of the viewport */
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
		margin-right: 20px;
		margin-left: 20px;
	}
</style>
