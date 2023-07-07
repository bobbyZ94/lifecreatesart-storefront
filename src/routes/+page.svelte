<script lang="ts">
	import ArrowDown from '~icons/mdi/arrow-down'
	import Hero from '../components/Blocks/Hero.svelte'
	import Text from '../components/Blocks/Text.svelte'
	import TextImage from '../components/Blocks/TextImage.svelte'
	import { gsap } from 'gsap/dist/gsap.js'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	import { onMount } from 'svelte'
	export let data

	// Gsap scroll trigger animations
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger)
		gsap.to('.block-text-container', {
			scrollTrigger: {
				trigger: '.block-text-container',
				start: 'top top',
				scrub: true,
				pin: true,
				// Removes whitespace left behind by pinning
				onLeave: function (self: any) {
					let start = self.start
					self.scroll(self.start)
					self.disable()
					self.animation.progress(1)
					ScrollTrigger.refresh()
					window.scrollTo(0, start)
				}
			},
			x: 0,
			duration: 3
		})
	})

	// Toggle down arrow
	let y: number
	let toggleArrowDown: boolean = false
	setTimeout(() => {
		toggleArrowDown = true
	}, 3000)
</script>

<svelte:window bind:scrollY={y} />

<div class="h-full w-full">
	<div class="relative flex h-screen w-full items-center justify-center md:p-5">
		<img src="images/logo.jpg" alt="Hero" class="h-full object-contain" />
		{#if toggleArrowDown && y < 200}
			<div
				class="absolute bottom-[3rem] transform animate-bounce duration-300 ease-in md:bottom-[3rem] md:left-auto md:right-[3rem]"
			>
				<a href="/#0"><ArrowDown style="font-size: 30px" /></a>
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-32 pt-32">
		{#each data.frontpage.components as component, index}
			<div class="" id={index.toString()}>
				{#if component.collection === 'block_hero' && 'subtitle' in component.item}
					<div class="overflow-hidden">
						<Hero block={component.item} />
					</div>
				{:else if component.collection === 'block_text' && 'text' in component.item}
					<div class="block-text-container">
						<Text block={component.item} />
					</div>
				{:else if component.collection === 'block_text_image' && 'flip_image' in component.item}
					<div>
						<TextImage block={component.item} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.block-text-container {
		@apply -translate-x-[1000px];
	}
</style>
