<script lang="ts">
	import { fade } from 'svelte/transition'
	export let toggleNavlist: boolean
	export let transitionDuration: number
</script>

<div
	transition:fade={{ duration: transitionDuration }}
	class="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-white/95"
>
	<ul
		class="flex flex-col items-center gap-10 text-2xl font-semibold uppercase tracking-wide md:text-4xl"
	>
		<li>
			<a
				class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
				on:click={() => (toggleNavlist = !toggleNavlist)}
				href="/">Home</a
			>
		</li>
		<li>
			<a
				class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
				on:click={() => (toggleNavlist = !toggleNavlist)}
				href="/about">Über Mich</a
			>
		</li>
		<li>
			<a
				class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
				on:click={() => (toggleNavlist = !toggleNavlist)}
				href="/gallery">Gallerie</a
			>
		</li>
	</ul>
</div>
