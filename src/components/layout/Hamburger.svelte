<script lang="ts">
  export let toggelNavlist: boolean
</script>

<button class="-translate-y-[2px] hover:cursor-pointer flex flex-col justify-center items-center gap-[5px] md:gap-[6px]" on:click={() => (toggelNavlist = !toggelNavlist)}>
  <div class={`hamburger-bar ${toggelNavlist ? "rotate-45 translate-y-[10px] md:translate-y-3" : ""}`} />
  <div class={`hamburger-bar ${toggelNavlist ? "opacity-0" : ""}`} />
  <div class={`hamburger-bar ${toggelNavlist ? "-rotate-45 -translate-y-[10px] md:-translate-y-3" : ""}`} />
</button>

<style>
	.hamburger-bar {
		@apply h-[3px] md:h-1 w-8 md:w-10 bg-black rounded-full transition ease-in-out transform duration-300;
	}
</style>