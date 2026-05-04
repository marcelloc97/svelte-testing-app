<script lang="ts">
	//#region Imports
	import { scale } from "svelte/transition";
	import Icon from "@iconify/svelte";

	import { resolve } from "$app/paths";
	import { replaceState } from "$app/navigation";

	import type FabButton from ".";

	//#endregion

	const { scrollThreshold }: FabButton.FabButtonProps = $props();

	let winScrollY: number = $state(0);
	let timeout: NodeJS.Timeout | null = null;
	let fabBtnClasses = $state([
		"fixed right-10 bottom-10 p-2 z-10 cursor-pointer",
		"rounded-full transition-colors bg-gray-700 hover:bg-gray-600"
	]);

	function handleClick() {
		if (timeout) timeout = null;

		timeout = setTimeout(() => {
			replaceState(resolve("/"), {});
			timeout = null;
		}, 10);
	}
</script>

<svelte:window bind:scrollY={winScrollY} />

{#if winScrollY > scrollThreshold}
	<a href="#top" class={fabBtnClasses} transition:scale={{ duration: 250 }} onclick={handleClick}>
		<Icon icon="mdi:chevron-up" font-size={32} />
	</a>
{/if}
