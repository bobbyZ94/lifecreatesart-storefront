<script lang="ts">
	export let data
</script>

<div class="my-20 max-w-5xl overflow-hidden rounded-lg p-5 drop-shadow-md">
	<div class="mb-12 text-center text-4xl font-bold md:text-6xl">Impressum</div>
	<div
		class="prose break-words p-2 md:prose-xl prose-blockquote:border-l-gray-500 marker:prose-ol:text-black marker:prose-ul:text-black"
	>
		{@html data.impressum.text}
	</div>
</div>
