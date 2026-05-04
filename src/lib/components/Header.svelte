<script lang="ts">
	import { Button, Dropdown } from "flowbite-svelte";
	import Icon from "@iconify/svelte";

	import { locales, setLocale } from "$lib/paraglide/runtime";

	import Logo from "./Logo.svelte";
	import Navigation from "./Navigation.svelte";

	let languageDropdownOpen = $state(false);
</script>

<header class="flex w-auto items-center justify-between bg-gray-900 pr-2 pl-2">
	<Logo />

	<div class="flex items-center justify-between">
		<Navigation class="mr-2" />
		<Button
			outline
			size="xs"
			class="rounded-full border-none px-2 text-gray-50 transition-colors hover:bg-gray-50 hover:text-gray-900"
			onclick={() => (languageDropdownOpen = true)}
		>
			<Icon icon="mdi:web" font-size={20} />
		</Button>
		<Dropdown isOpen={languageDropdownOpen} offset={0} class="w-20 bg-gray-800 mask-clip-content">
			{#each locales as locale (locale)}
				<Button
					outline
					class="w-full border-none text-gray-300 transition-colors not-first:rounded-none not-last:rounded-none not-even:mr-1 first:rounded-t-lg first:rounded-b-none last:rounded-t-none last:rounded-b-lg hover:bg-gray-300 hover:text-gray-900"
					onclick={() => setLocale(locale)}
				>
					{locale}
				</Button>
			{/each}
		</Dropdown>
	</div>
</header>
