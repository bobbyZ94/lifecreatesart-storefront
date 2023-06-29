<script lang="ts">
	import { browser } from '$app/environment'
	import Hamburger from './Hamburger.svelte'
	import Navlist from './Navlist.svelte'
	let toggelNavlist = false
	let transitionDuration = 300

	$: if (browser) {
		if (toggelNavlist) {
			document.querySelector('body')?.classList.add('overflow-y-scroll', 'w-full', 'fixed')
		} else {
			// Fix for scrollbar flash
			setTimeout(
				() => document.querySelector('body')?.classList.remove('overflow-y-scroll', 'w-full', 'fixed'),
				transitionDuration
			)
		}
	}
</script>

<div
	class="sticky left-0 top-0 z-10 flex h-16 md:h-20 w-full items-center justify-between bg-white/90 px-3 py-3 md:px-8"
>
	<div class="font-rampart text-2xl font-semibold uppercase tracking-widest md:text-5xl overflow">
		<a href="/">Lifecreatesart</a>
	</div>
	<Hamburger bind:toggelNavlist />
</div>
{#if toggelNavlist}
	<Navlist bind:toggelNavlist {transitionDuration} />
{/if}

