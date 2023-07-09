<script lang="ts">
	import Hamburger from './Hamburger.svelte'
	import Navlist from './Navlist.svelte'
	import hideHeaderOnScrollDown from '../../utils/hideHeaderOnScrollDown'
	import { storeVisibleHeader } from '../../stores/visibleHeader'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let toggleNavlist: boolean = false
	let transitionDuration: number = 300

	// Remove scrollbar when navlist is open while preserving sroll position
	let mounted: boolean
	let navlist: HTMLElement
	let navheader: HTMLElement
	onMount(() => (mounted = true)) // Make sure component exists in DOM so document and window can be accessed
	function removeScrollbarWithoutLayoutShift() {
		const scrollbarWidth = window.innerWidth - document.body.clientWidth
		if (toggleNavlist) {
			document.body.style.marginRight = `${scrollbarWidth}px`
			if (navheader) navheader.style.marginRight = `${scrollbarWidth}px`
			if (navlist) navlist.style.marginRight = `${scrollbarWidth}px`
			document.body.style.overflow = 'hidden'
		} else {
			setTimeout(() => {
				document.body.style.marginRight = '0px'
				document.body.style.overflow = ''
				if (navheader) navheader.style.marginRight = '0px'
				if (navlist) navlist.style.marginRight = '0px'
			}, transitionDuration)
		}
	}
	$: toggleNavlist, mounted && removeScrollbarWithoutLayoutShift() // Runs function everytime toggleNavlist is changed and mounted - regardless of value of toggleNavlist

	// Hide header when scrolling down
	let y: number
	$: $storeVisibleHeader = hideHeaderOnScrollDown(y, $storeVisibleHeader)
</script>

<svelte:window bind:scrollY={y} />

<div>
	{#if $storeVisibleHeader}
		<div
			bind:this={navheader}
			transition:fly={{ duration: 400, y: -100 }}
			class="md:h-18 fixed right-0 top-0 z-20 flex h-14 w-full items-center justify-between px-5 py-3 md:px-8"
		>
			<div class="font-rampart text-3xl font-semibold tracking-wider md:text-5xl">
				<!-- <a href="/">Lifecreatesart</a> -->
			</div>
			<div class="mb:r-4 mt-4 rounded bg-transparent px-2 pb-1 pt-2 backdrop-blur-lg">
				<Hamburger bind:toggleNavlist />
			</div>
		</div>
	{/if}
	{#if toggleNavlist}
		<Navlist bind:toggleNavlist {transitionDuration} bind:navlist />
	{/if}
</div>
