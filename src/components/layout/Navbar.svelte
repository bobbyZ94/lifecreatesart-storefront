<script lang="ts">
	import { browser } from '$app/environment'
	import Hamburger from './Hamburger.svelte'
	import Navlist from './Navlist.svelte'
	import { storeVisibleHeader } from '../../stores/visibleHeader'
	let toggelNavlist = false
	let transitionDuration = 300

	// Remove scrollbar when navlist is open while preserving sroll position
	$: if (browser) {
		if (toggelNavlist) {
			let oldWidth = document.documentElement.clientWidth
			document.querySelector('body')?.classList.add('overflow-hidden')
			let newWidth = document.documentElement.clientWidth
			let scrollbarWidth = Math.max(0, newWidth - oldWidth)
			document.body.style.marginRight = `${scrollbarWidth}px`
			document.getElementById('Navbar')!.style.right = `${scrollbarWidth}px`
		} else {
			setTimeout(() => {
				document.querySelector('body')?.classList.remove('overflow-hidden')
				document.body.style.marginRight = '0px'
				document.getElementById('Navbar')!.style.right = '0px'
			}, transitionDuration)
		}
	}

	// Hide header when scrolling down
	let y: number
	let lastY: number = 0
	let offsetY: number = 200
	let tolerance: number = 0
	function deriveHeader(y: number, dy: number) {
		// show if at the top of page
		if (y < offsetY) {
			return true
		}
		// don't change the state unless scroll delta is above a threshold
		if (Math.abs(dy) <= tolerance) {
			return $storeVisibleHeader
		}
		// if scrolling up, show
		if (dy > 0) {
			return true
		}
		// if scrolling down, hide
		return false
	}
	function updateHeader(y: number) {
		const dy = lastY - y
		lastY = y
		return deriveHeader(y, dy)
	}
	$: $storeVisibleHeader = updateHeader(y)
</script>

<svelte:window bind:scrollY={y} />

<div
	id="Navbar"
	class={`${
		$storeVisibleHeader ? 'translate-y-[0%]' : '-translate-y-[100%]'
	} fixed right-0 top-0 z-20 flex h-16 w-full transform items-center justify-between px-5 py-3 transition-transform duration-300 ease-in-out md:h-20 md:px-8`}
>
	<div class="font-rampart text-3xl font-semibold tracking-wider md:text-5xl">
		<!-- <a href="/">Lifecreatesart</a> -->
	</div>
	<div class="mr-3 mt-4">
		<Hamburger bind:toggelNavlist />
	</div>
</div>
{#if toggelNavlist}
	<Navlist bind:toggelNavlist {transitionDuration} />
{/if}
