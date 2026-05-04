<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";

	import "./layout.css";

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import FabButton from "$lib/components/buttons/Fab/index.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Header />

<!-- class="h-dvh max-h-dvh" -->
<main class="relative">
	{@render children()}
	<FabButton scrollThreshold={100} />
</main>

<Footer />
