<script lang="ts">
	import Text from './Text.svelte'
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	import { gsap } from 'gsap/dist/gsap.js'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	import { onMount } from 'svelte'
	export let block: Block_Text_Image
	let x: number = 0
	let ref: Node

	// Gsap scroll trigger animations
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger)
		let ctx = gsap.context(() => {
			if (x > 768) {
				gsap.to('.block-text-container-left', {
					scrollTrigger: {
						trigger: '.block-text-container-left',
						start: '0% 100%',
						end: 'top',
						scrub: 2.0
					},
					x: 0,
					duration: 3
				})
				gsap.to('.block-image-container-right', {
					scrollTrigger: {
						trigger: '.block-image-container-right',
						start: '0% 100%',
						end: 'top',
						scrub: 2.0
					},
					x: 0,
					duration: 3
				})
			} else {
				gsap.to('.block-text-container-left', {
					scrollTrigger: {
						trigger: '.block-text-container-left',
						start: 'center bottom',
						end: 'top',
						scrub: 2.0
					},
					x: 0,
					duration: 3
				})
				gsap.to('.block-image-container-right', {
					scrollTrigger: {
						trigger: '.block-image-container-right',
						start: 'center bottom',
						end: 'top',
						scrub: 2.0
					},
					x: 0,
					duration: 3
				})
			}
		}, ref)
	})
	$: console.log(x)
	$: console.log(block.flip_image)
</script>

<svelte:window bind:innerWidth={x} />

<div
	bind:this={ref}
	class="grid h-full w-full grid-cols-1 gap-32 md:h-screen md:grid-cols-2 md:gap-5"
>
	<div class="block-text-container-left order-1">
		<Text {block} />
	</div>
	<div class="block-image-container-right order-2">
		<img
			src={`${PUBLIC_DIRECTUS_URL}/assets/${block.image.filename_disk}`}
			alt="Hero"
			class={`${
				block.flip_image ? 'rounded-l-full' : 'rounded-r-full'
			} h-full w-full object-cover drop-shadow-lg`}
		/>
	</div>

	<!-- <div class="block-text-container-right order-2">
			<Text {block} />
		</div>
		<div class="block-image-container-left order-1">
			<img
				src={`${PUBLIC_DIRECTUS_URL}/assets/${block.image.filename_disk}`}
				alt="Hero"
				class={`${
					block.flip_image ? 'rounded-l-full' : 'rounded-r-full'
				} h-full w-full object-cover drop-shadow-lg`}
			/>
		</div> -->
</div>

<style>
	.block-text-container-right {
		@apply translate-x-[1500px];
	}
	.block-text-container-left {
		@apply -translate-x-[1500px];
	}
	.block-image-container-right {
		@apply translate-x-[1500px];
	}
	.block-image-container-left {
		@apply -translate-x-[1500px];
	}
</style>
