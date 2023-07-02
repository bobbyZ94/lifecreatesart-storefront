<script lang="ts">
	import { fade } from 'svelte/transition'
	import Close from '~icons/mdi/close-circle-outline'
	export let imageModal: boolean
	export let imageAlt: string | undefined
	export let imageDescription: string
	export let imageSrc: string
</script>

<button
	transition:fade={{ duration: 300 }}
	on:click|self={() => (imageModal = false)}
	class="fixed left-0 top-0 z-20 flex h-screen w-screen cursor-default flex-col items-center justify-center bg-black/80"
>
	<button on:click={() => (imageModal = false)}>
		<Close class="fixed right-8 top-8 cursor-pointer text-white" style="font-size: 28px" />
	</button>
	<button
		on:click|self={() => (imageModal = false)}
		class="flex cursor-default flex-col items-center justify-center gap-5"
	>
		<img
			src={`https://directus.lifecreates.art/assets/${imageSrc}`}
			alt={imageAlt}
			class="max-h-[40rem] max-w-[22rem] rounded drop-shadow-lg md:max-w-[33rem] lg:max-w-[44rem] xl:max-w-[55rem]"
		/>
		<div class="translate-x-2 translate-y-2 rounded bg-gray-400">
			<div class="max-w-fit -translate-x-2 -translate-y-2 rounded bg-white p-3 drop-shadow-lg">
				<div class="rounded font-bold uppercase underline underline-offset-4">
					{imageAlt}
				</div>
				<div class="prose prose-sm">
					{@html imageDescription}
				</div>
			</div>
		</div>
	</button>
</button>
