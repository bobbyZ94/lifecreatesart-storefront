<script lang="ts">
	export let title: string
	export let description: string
	export let inventory: number
	export let price: number
	export let width: number
	export let height: number
	export let weight: number
</script>

<div class="my-20 flex w-full max-w-3xl flex-col items-center gap-8">
	<div class="grid w-full gap-8 md:grid-cols-3">
		<div class="flex flex-col gap-6 md:col-span-2">
			<div class="text-3xl font-bold md:text-5xl">{title}</div>
			<div class="text-xl md:text-2xl">{description}</div>
		</div>
		<div class="md-cols-span-1 flex flex-col gap-3 text-xl md:text-2xl">
			<div>Width: {width ? width : ' ??'}</div>
			<div>Height: {height ? height : ' ??'}</div>
			<div>Weight: {weight ? weight : ' ??'}</div>
		</div>
	</div>
	<div class="self-start text-xl md:text-2xl">{inventory} pcs. in stock.</div>
	<div class="self-start text-xl md:text-2xl">
		{new Intl.NumberFormat('en-DE', { style: 'currency', currency: 'EUR' }).format(price / 100)}
	</div>
	<button
		class="group w-full max-w-md justify-self-center rounded-xl bg-gray-400 text-center text-lg text-white md:text-2xl"
		><div
			class="h-full rounded-xl bg-gray-800 p-2 drop-shadow-lg duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2"
		>
			Add to cart
		</div></button
	>
</div>
