<script lang="ts">
	import { gsap } from 'gsap/dist/gsap.js'
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
	import { onMount } from 'svelte'
	import ArrowDown from '~icons/mdi/arrow-down'
	import Hero from '../components/Blocks/Hero.svelte'
	import Text from '../components/Blocks/Text.svelte'
	import TextImage from '../components/Blocks/TextImage.svelte'
	export let data

	// Toggle down arrow
	let y: number
	let toggleArrowDown: boolean = false
	setTimeout(() => {
		toggleArrowDown = true
	}, 3000)

	// Gsap scroll trigger animations
	let ref: Node
	$: x = 0
	$: mobileScreen = x > 768 ? false : true

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger)
		let ctx = gsap.context(() => {
			gsap.fromTo(
				'#block-text-container',
				{
					x: -1000
				},
				{
					x: 0,
					duration: 3,
					scrollTrigger: {
						trigger: '#block-text-container',
						start: 'top bottom', // [trigger element pos (start/end markers)] [scroller pos (start/end scroller markers)]
						end: mobileScreen ? '50% bottom' : '30% center',
						scrub: 3.0
					}
				}
			)
		}, ref)
	})
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={x} />

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
		{#each data.frontpage.components as component, i}
			<div class="" id={i.toString()}>
				{#if component.collection === 'block_hero' && 'subtitle' in component.item}
					<div class="overflow-hidden">
						<Hero block={component.item} />
					</div>
				{:else if component.collection === 'block_text' && 'text' in component.item}
					<div bind:this={ref}>
						<div id="block-text-container">
							<Text block={component.item} />
						</div>
					</div>
				{:else if component.collection === 'block_text_image' && 'flip_image' in component.item}
					<TextImage block={component.item} />
				{/if}
			</div>
		{/each}
	</div>
</div>
