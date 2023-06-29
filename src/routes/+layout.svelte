<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/layout/Navbar.svelte'
	import Footer from '../components/layout/Footer.svelte'
</script>

<div class="font-comfortaa text-lg md:text-xl">
	<div class="flex flex-col">
		<Navbar />
		<div class="min-h-screen w-full bg-fixed flex items-center justify-center" style="background-image: url('images/art.jpg')">
				<slot />
		</div>
	</div>
	<Footer />
</div>

