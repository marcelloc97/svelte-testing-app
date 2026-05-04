<script lang="ts">
	import { Button } from "flowbite-svelte";

	import { m } from "$lib/paraglide/messages";
	import programmer from "$lib/assets/programmer.webp";
	// import Button from "$lib/components/buttons/Button/index.svelte";

	const buttonStyle = [
		"mt-6 w-fit px-6 py-2",
		"cursor-pointer",
		"border border-gray-900 rounded-4xl transition-colors",
		"hover:border-gray-600 hover:text-gray-600"
	];
</script>

<section class="flex items-center justify-between bg-white px-20 py-8 text-gray-900">
	<div class="flex w-1/2 flex-col">
		<h3 class="text-heading text-5xl font-bold tracking-tight">Falcon Studios</h3>
		<p class="mt-2 text-lg">
			{m["home_page.intro_p"]()}
		</p>

		<Button
			outline
			pill
			tag="a"
			href="#contact"
			color="primary"
			class="mt-4 w-fit transition-colors"
		>
			{m["common.contact_page"]()}
		</Button>
	</div>

	<img src={programmer} alt="man programming" />
</section>

<section id="team" class="flex items-center justify-between bg-cover px-20 py-8">
	<div class="flex w-1/2 flex-col">
		<h3 class="text-heading text-5xl font-bold tracking-tight">
			{m["home_page.section_team_title"]()}
		</h3>

		<p class="mt-2 text-lg">
			{m["home_page.team_p"]()}
			{m["home_page.calling_p"]()}
		</p>

		<Button
			outline
			pill
			tag="a"
			href="#team"
			class="mt-4 w-fit border-gray-50 text-gray-50 transition-colors hover:bg-gray-50 hover:text-gray-900"
		>
			{m["common.join_us"]()}
		</Button>
	</div>

	<img src={programmer} alt="man programming" />
</section>
