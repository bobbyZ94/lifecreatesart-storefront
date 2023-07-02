<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/layout/Navbar.svelte'
	import Footer from '../components/layout/Footer.svelte'
</script>

<div class="font-comfortaa text-lg md:text-xl">
	<div class="flex flex-col">
		<Navbar />
		<div class="flex min-h-screen w-full items-center justify-center">
			<div class="mx-5 my-20 max-w-7xl rounded-lg bg-white">
				<slot />
			</div>
		</div>
	</div>
	<Footer />
</div>
