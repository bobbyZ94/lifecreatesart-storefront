<script lang="ts">
	import Instagram from '~icons/mdi/instagram'
	import Email from '~icons/mdi/email'
</script>

<div class="flex flex-col items-center justify-center gap-5 py-16">
	<a href="https://www.instagram.com/lifecreatesart" class="flex items-center gap-2">
		<Instagram style="font-size: 28px" />
		Follow me on Instagram!
	</a>

	<a href="mailto:info@name.com" class="flex items-center gap-2">
		<Email style="font-size: 28px" />
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
	<div>Name © {new Date().getFullYear()}</div>
</div>
