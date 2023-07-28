<script lang="ts">
	import Hamburger from './Hamburger.svelte'
	import Cart from '../Shop/Cart.svelte'
	import Navlist from './Navlist.svelte'
	import CartOutline from '~icons/mdi/cart-outline'
	import hideHeaderOnScrollDown from '../../utils/hideHeaderOnScrollDown'
	import { visibleHeaderStore } from '../../stores/visibleHeaderStore'
	import { cartStore } from '../../stores/cartStore'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let toggleNavlist: boolean = false
	let hiddenCart: boolean = true
	let transitionDuration: number = 300

	// Remove scrollbar when navlist is open while preserving sroll position
	let mounted: boolean
	let navlist: HTMLElement
	let navheader: HTMLElement
	let cartButton: HTMLElement
	onMount(() => (mounted = true)) // Make sure component exists in DOM so document and window can be accessed
	function removeScrollbarWithoutLayoutShift(toggle: boolean, reverse: boolean = false) {
		const scrollbarWidth = window.innerWidth - document.body.clientWidth
		if ((toggle && !reverse) || (!toggle && reverse)) {
			document.body.style.marginRight = `${scrollbarWidth}px`
			if (navheader) navheader.style.marginRight = `${scrollbarWidth}px`
			if (navlist) navlist.style.marginRight = `${scrollbarWidth}px`
			if (cartButton) cartButton.style.marginLeft = `${scrollbarWidth}px`
			document.body.style.overflow = 'hidden'
		} else {
			setTimeout(() => {
				document.body.style.marginRight = '0px'
				document.body.style.overflow = ''
				if (navheader) navheader.style.marginRight = '0px'
				if (navlist) navlist.style.marginRight = '0px'
				if (cartButton) cartButton.style.marginLeft = '0px'
			}, transitionDuration)
		}
	}

	// Runs function everytime toggleNavlist is changed and mounted - regardless of value of toggleNavlist
	$: toggleNavlist, mounted && removeScrollbarWithoutLayoutShift(toggleNavlist)
	$: hiddenCart, mounted && removeScrollbarWithoutLayoutShift(hiddenCart, true)
	// Hide header when scrolling down
	let y: number
	$: $visibleHeaderStore = hideHeaderOnScrollDown(y, $visibleHeaderStore)

	// Calculate number of items in cart
	let items: number = 0
	$: items = $cartStore.items?.reduce((acc, item) => acc + item.quantity, 0)

	// Animate cart when items are added
	let cartButtonContainer: HTMLElement
	function animateCart() {
		setTimeout(() => {
			cartButtonContainer?.classList.add('scale-110')
			setTimeout(() => cartButtonContainer?.classList.remove('scale-110'), 300)
		}, transitionDuration)
	}
	$: items, mounted && animateCart()
</script>

<svelte:window bind:scrollY={y} />

<div class="relative">
	{#if $visibleHeaderStore}
		<div
			bind:this={navheader}
			transition:fly={{ duration: 300, y: -100 }}
			class={`${
				toggleNavlist ? 'bg-transparent' : 'bg-lifecreatesartblue/70'
			} fixed right-0 top-0 z-20 flex h-14 w-full items-center justify-between px-5 backdrop-blur-md md:h-[4.5rem] md:px-12 xl:px-20`}
		>
			<div
				class="relative px-2 pt-1 transition-all duration-300 ease-in-out"
				bind:this={cartButtonContainer}
			>
				<button on:click={() => (hiddenCart = false)} bind:this={cartButton}>
					<CartOutline class="text-3xl md:text-4xl" />
				</button>
				{#if items > 0}
					<div
						class="absolute right-0 top-0 h-[19px] w-[20px] rounded-full bg-white/95 text-center font-sans text-xs leading-5"
					>
						{items}
					</div>
				{/if}
			</div>
			<Hamburger bind:toggleNavlist />
		</div>
	{/if}
	{#if toggleNavlist}
		<Navlist bind:toggleNavlist {transitionDuration} bind:navlist />
	{/if}
	<Cart bind:hiddenCart />
</div>
