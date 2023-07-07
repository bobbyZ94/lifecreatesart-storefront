<script lang="ts">
	import { browser } from '$app/environment'
	import Hamburger from './Hamburger.svelte'
	import Navlist from './Navlist.svelte'
	import removeScrollbar from '../../utils/removeScrollbar'
	import hideHeaderOnScrollDown from '../../utils/hideHeaderOnScrollDown'
	import { storeVisibleHeader } from '../../stores/visibleHeader'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	// Remove scrollbar when navlist is open while preserving sroll position
	let toggelNavlist = false
	let transitionDuration = 300
	$: if (browser && document) {
		onMount(() => {
			removeScrollbar(toggelNavlist, transitionDuration)
		})
	}

	// Hide header when scrolling down
	let y: number
	$: $storeVisibleHeader = hideHeaderOnScrollDown(y, $storeVisibleHeader)
</script>

<svelte:window bind:scrollY={y} />

{#if $storeVisibleHeader}
	<div
		transition:fly={{ duration: 400, y: -100 }}
		id="Navbar"
		class="md:h-18 fixed right-0 top-0 z-20 flex h-14 w-full items-center justify-between px-5 py-3 md:px-8"
	>
		<div class="font-rampart text-3xl font-semibold tracking-wider md:text-5xl">
			<!-- <a href="/">Lifecreatesart</a> -->
		</div>
		<div class="mb:r-4 mt-4 rounded bg-transparent px-2 pb-1 pt-2 backdrop-blur-lg">
			<Hamburger bind:toggelNavlist />
		</div>
	</div>
{/if}
{#if toggelNavlist}
	<Navlist bind:toggelNavlist {transitionDuration} />
{/if}
