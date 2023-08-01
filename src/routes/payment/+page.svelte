<script lang="ts">
	import { cartStore } from '../../stores/cartStore'
</script>

{#if $cartStore.shipping_address}
	<div class="my-20 max-w-xl rounded-lg p-5 drop-shadow-md md:my-32">PAYMENT</div>
{:else}
	<div>ERROR</div>
{/if}
