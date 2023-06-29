<script lang="ts">
	import { fade } from 'svelte/transition'
	export let toggelNavlist: boolean
	export let transitionDuration: number
</script>

<div
	transition:fade={{ duration: transitionDuration }}
	class="fixed left-0 top-16 md:top-20 flex h-screen w-full items-center justify-center overflow-hidden bg-white/90"
>
	<ul
		class="flex -translate-y-14 flex-col items-center gap-10 text-xl font-semibold uppercase tracking-wide md:text-2xl"
	>
		<li>
			<a
				class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
				on:click={() => (toggelNavlist = !toggelNavlist)}
				href="/">HOME</a
			>
		</li>
		<li>
			<a
				class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
				on:click={() => (toggelNavlist = !toggelNavlist)}
				href="/about">ABOUT</a
			>
		</li>
	</ul>
</div>
