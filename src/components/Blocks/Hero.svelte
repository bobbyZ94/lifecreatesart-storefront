<script lang="ts">
	import { gsap } from 'gsap/dist/gsap.js'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public'
	import { onMount } from 'svelte'
	export let block: Block_Hero
	let ref: Node

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger)
		let ctx = gsap.context(() => {
			gsap.to('.block-hero-image', {
				scrollTrigger: {
					trigger: '.block-hero-image',
					pin: '#block-hero-container',
					start: 'center center',
					scrub: 2.0
					// Removes whitespace left behind by pinning if you want to run only once=true ! DONT REMOVE INCASE NEEDED !
					// onLeave: function (self: any) {
					// 	let start = self.start
					// 	self.scroll(self.start)
					// 	self.disable()
					// 	self.animation.progress(1)
					// 	ScrollTrigger.refresh()
					// 	window.scrollTo(0, start)
					// }
				},
				scale: 1,
				duration: 3
			})
		}, ref)
	})
</script>

<div bind:this={ref}>
	<div id="block-hero-container" class="relative h-screen w-full">
		<img
			src={`${PUBLIC_DIRECTUS_URL}/assets/${block.image.filename_disk}`}
			alt="Hero"
			class="block-hero-image h-full w-full object-cover drop-shadow-lg md:h-screen"
		/>
		{#if block.title || block.subtitle}
			<div
				class="absolute left-[50%] top-[50%] flex w-4/5 -translate-x-[50%] -translate-y-[50%] flex-col gap-5 rounded-3xl bg-white/70 p-2 text-center backdrop-blur-md md:w-3/5 md:p-5 lg:w-2/5"
			>
				{#if block.title}
					<div class="font-playfair text-3xl font-bold tracking-wider md:text-6xl">
						{block.title}
					</div>
				{/if}
				{#if block.subtitle}
					<div class="text-xl md:text-2xl">
						{block.subtitle}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.block-hero-image {
		@apply scale-[2.0];
	}
</style>
