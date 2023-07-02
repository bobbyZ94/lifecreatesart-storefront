<script lang="ts">
	import { browser } from '$app/environment'
	import Hamburger from './Hamburger.svelte'
	import Navlist from './Navlist.svelte'
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
		} else {
			document.querySelector('body')?.classList.remove('overflow-hidden')
			document.body.style.marginRight = '0px'
		}
	}
</script>

<div
	class="sticky left-0 top-0 z-10 flex h-16 w-full items-center justify-between bg-white/95 px-3 py-3 drop-shadow-lg md:h-20 md:px-8"
>
	<div class="font-rampart overflow text-3xl font-semibold uppercase tracking-wider md:text-5xl">
		<a href="/">Lifecreatesart</a>
	</div>
	<Hamburger bind:toggelNavlist />
</div>
{#if toggelNavlist}
	<Navlist bind:toggelNavlist {transitionDuration} />
{/if}
