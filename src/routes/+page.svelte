<script lang="ts">
	import { inview } from 'svelte-inview'
	import type { ObserverEventDetails, ScrollDirection, Options } from 'svelte-inview'
	import ArrowDown from '~icons/mdi/arrow-down'
	import Hero from '../components/Blocks/Hero.svelte'
	import Text from '../components/Blocks/Text.svelte'
	import TextImage from '../components/Blocks/TextImage.svelte'
	export let data

	// Animation by scrolling into view
	let y: number
	let toggleArrowDown: boolean = false
	setTimeout(() => {
		toggleArrowDown = true
	}, 3000)
	console.log(data)

	let isInView: boolean
	let scrollDirection: ScrollDirection
	const options: Options = {
		rootMargin: '-50px',
		unobserveOnEnter: true
	}

	// const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
	// 	isInView = detail.inView
	// 	scrollDirection = detail.scrollDirection.vertical
	// }
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
	<div class="flex flex-col gap-32">
		{#each data.frontpage.components as component, index}
			<div id={index.toString()}>
				{#if component.collection === 'block_hero' && 'subtitle' in component.item}
					<Hero block={component.item} />
				{:else if component.collection === 'block_text' && 'text' in component.item}
					<Text block={component.item} />
				{:else if component.collection === 'block_text_image' && 'flip_image' in component.item}
					<TextImage block={component.item} />
				{/if}
			</div>
		{/each}
	</div>
</div>
