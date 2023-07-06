<script lang="ts">
	import Instagram from '~icons/mdi/instagram'
	import Email from '~icons/mdi/email'
</script>

<div class="flex flex-col items-center justify-center gap-3 py-20 text-lg md:text-xl">
	<a href="https://www.instagram.com/lifecreatesart" class="flex items-center gap-2">
		<Instagram style="font-size: 25px" />
		Follow me on Instagram
	</a>

	<a href="mailto:info@name.com" class="flex items-center gap-2">
		<Email style="font-size: 25px" />
		<span>info@name.com</span>
	</a>
	<a
		class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
		href="/privacy">Privacy</a
	>
	<a
		class="border-b border-transparent transition-all duration-200 ease-in-out hover:border-black"
		href="/impressum">Impressum</a
	>
	<div>Lifecreatesart © {new Date().getFullYear()}</div>
</div>
