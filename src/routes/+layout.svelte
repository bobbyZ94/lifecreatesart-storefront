<script lang="ts">
	import '../app.postcss'
	import Navbar from '../components/Layout/Navbar.svelte'
	import Footer from '../components/Layout/Footer.svelte'
	import { cartStore } from '../stores/cartStore'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	// Fill cartStore with cart from layout load function
	$: $cartStore = data.cart

	// Keep cart state items sorted by created at
	$: $cartStore.items?.sort((a, b) => {
		return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	})

	$: console.log($cartStore), $cartStore
</script>

<div class="bg-lifecreatesartblue font-comfortaa">
	<div class="flex flex-col">
		<Navbar />
		<div class="flex min-h-screen w-full items-center justify-center">
			<slot />
		</div>
	</div>
	<Footer />
</div>
