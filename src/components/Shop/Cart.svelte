<script lang="ts">
	import { cartStore } from '../../stores/cartStore'
	import { Drawer, CloseButton } from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'
	export let hiddenCart: boolean
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}
	// $: console.log($cartStore)
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hiddenCart}>
	<div class="flex items-center">
		<CloseButton on:click={() => (hiddenCart = true)} class="mb-4 dark:text-white" />
	</div>
	<!-- <div>
		{#if $cartStore.items.length === 0}
			<div class="text-center">Cart is empty</div>
		{:else}
			{#each $cartStore.items as item}
				<div>{item.title}</div>
			{/each}
		{/if}
	</div> -->
</Drawer>
