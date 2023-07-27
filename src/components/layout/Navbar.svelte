<script lang="ts">
	import Hamburger from './Hamburger.svelte'
	import Cart from '../Shop/Cart.svelte'
	import Navlist from './Navlist.svelte'
	import CartOutline from '~icons/mdi/cart-outline'
	import hideHeaderOnScrollDown from '../../utils/hideHeaderOnScrollDown'
	import { storeVisibleHeader } from '../../stores/visibleHeader'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let toggleNavlist: boolean = false
	let hiddenCart: boolean = true
	let transitionDuration: number = 300

	// Remove scrollbar when navlist is open while preserving sroll position
	let mounted: boolean
	let navlist: HTMLElement
	let navheader: HTMLElement
	onMount(() => (mounted = true)) // Make sure component exists in DOM so document and window can be accessed
	function removeScrollbarWithoutLayoutShift(toggle: boolean, reverse: boolean = false) {
		const scrollbarWidth = window.innerWidth - document.body.clientWidth
		if ((toggle && !reverse) || (!toggle && reverse)) {
			console.log('HERE1')
			document.body.style.marginRight = `${scrollbarWidth}px`
			if (navheader) navheader.style.marginRight = `${scrollbarWidth}px`
			if (navlist) navlist.style.marginRight = `${scrollbarWidth}px`
			document.body.style.overflow = 'hidden'
		} else {
			setTimeout(() => {
				console.log('HERE')
				document.body.style.marginRight = '0px'
				document.body.style.overflow = ''
				if (navheader) navheader.style.marginRight = '0px'
				if (navlist) navlist.style.marginRight = '0px'
			}, transitionDuration)
		}
	}
	$: toggleNavlist, mounted && removeScrollbarWithoutLayoutShift(toggleNavlist) // Runs function everytime toggleNavlist is changed and mounted - regardless of value of toggleNavlist
	$: hiddenCart, mounted && removeScrollbarWithoutLayoutShift(hiddenCart, true) // Runs function everytime hiddenCart is changed and mounted - regardless of value of hiddenCart
	// Hide header when scrolling down
	let y: number
	$: $storeVisibleHeader = hideHeaderOnScrollDown(y, $storeVisibleHeader)
</script>

<svelte:window bind:scrollY={y} />

<div class="relative">
	{#if $storeVisibleHeader}
		<div
			bind:this={navheader}
			transition:fly={{ duration: 400, y: -100 }}
			class={`${
				toggleNavlist ? 'bg-transparent' : 'bg-lifecreatesartblue/70'
			} md:h-18 fixed right-0 top-0 z-20 flex h-14 w-full items-center justify-between px-5 backdrop-blur-md md:px-8`}
		>
			{#if !toggleNavlist}
				<button on:click={() => (hiddenCart = false)}>
					<CartOutline style="font-size: 28px" />
				</button>
			{:else}
				<div />
			{/if}
			<Hamburger bind:toggleNavlist />
		</div>
	{/if}
	{#if toggleNavlist}
		<Navlist bind:toggleNavlist {transitionDuration} bind:navlist />
	{/if}
	<Cart bind:hiddenCart />
</div>
