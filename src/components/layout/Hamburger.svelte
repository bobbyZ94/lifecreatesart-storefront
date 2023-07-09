<script lang="ts">
	export let toggleNavlist: boolean
</script>

<button
	class="flex -translate-y-[2px] flex-col items-center justify-center gap-[5px] hover:cursor-pointer md:gap-[6px]"
	on:click={() => (toggleNavlist = !toggleNavlist)}
>
	<div
		class={`hamburger-bar ${toggleNavlist ? 'translate-y-[10px] rotate-45 md:translate-y-3' : ''}`}
	/>
	<div class={`hamburger-bar ${toggleNavlist ? 'opacity-0' : ''}`} />
	<div
		class={`hamburger-bar ${
			toggleNavlist ? '-translate-y-[10px] -rotate-45 md:-translate-y-3' : ''
		}`}
	/>
</button>

<style>
	.hamburger-bar {
		@apply h-[3px] w-8 transform rounded-full bg-black transition duration-300 ease-in-out md:h-1 md:w-10;
	}
</style>
