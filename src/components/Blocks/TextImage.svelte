<script lang="ts">
	import Text from './Text.svelte'
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	import { gsap } from 'gsap/dist/gsap.js'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	import { onMount } from 'svelte'
	export let block: Block_Text_Image

	let ref: Node
	$: x = 0
	$: mobileScreen = x > 768 ? false : true

	// Gsap scroll trigger animations
	$: onMount(() => {
		gsap.registerPlugin(ScrollTrigger)
		let ctx = gsap.context(() => {
			gsap.fromTo(
				'.block-container-left',
				{
					x: -1000
				},
				{
					x: 0,
					duration: 3,
					scrollTrigger: {
						trigger: '.block-container-left',
						start: 'top bottom', // [trigger element pos (start/end markers)] [scroller pos (start/end scroller markers)]
						end: mobileScreen ? '50% bottom' : '30% center',
						scrub: 4.0
					}
				}
			)
			gsap.fromTo(
				'.block-container-right',
				{
					x: 1000
				},
				{
					x: 0,
					duration: 3,
					scrollTrigger: {
						trigger: '.block-container-right',
						start: 'top bottom', // [trigger element pos (start/end markers)] [scroller pos (start/end scroller markers)]
						end: mobileScreen ? '50% bottom' : '30% center',
						scrub: 4.0
					}
				}
			)
		}, ref)
	})
</script>

<svelte:window bind:innerWidth={x} />

<div
	bind:this={ref}
	class="grid h-full w-full grid-cols-1 gap-32 overflow-hidden md:h-screen md:grid-cols-2 md:gap-5"
>
	<div class={`${block.flip_image ? 'block-container-left' : 'block-container-right'}`}>
		<Text {block} />
	</div>
	<div
		class={`${
			block.flip_image
				? 'block-container-right rounded-br-[20%] rounded-tl-[20%] md:rounded-l-[40%] md:rounded-br-[0%] md:rounded-tl-[40%]'
				: 'block-container-left rounded-bl-[20%] rounded-tr-[20%] md:rounded-r-[40%] md:rounded-bl-[0%] md:rounded-tr-[40%]'
		} cursor-pointer overflow-hidden`}
	>
		<img
			src={`${PUBLIC_DIRECTUS_URL}/assets/${block.image.filename_disk}`}
			alt="Hero"
			class="h-full w-full object-cover drop-shadow-lg duration-[3000ms] ease-in-out hover:scale-150"
		/>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.block-container-right {
			@apply order-2;
		}
		.block-container-left {
			@apply order-1;
		}
	}
</style>
