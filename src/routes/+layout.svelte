<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/Layout/Navbar.svelte'
	import Footer from '../components/Layout/Footer.svelte'
</script>

<div class="font-comfortaa text-lg md:text-xl">
	<div class="flex flex-col">
		<Navbar />
		<div class="flex min-h-screen w-full items-center justify-center">
			<div class="mx-5 my-12 max-w-7xl md:my-20">
				<slot />
			</div>
		</div>
	</div>
	<Footer />
</div>
