<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { resolve } from "$app/paths";

	const { ...restProps } = $props();

	const items = [
		{
			link: "#about",
			text: m["common.about_page"]()
		},
		{
			link: "#team",
			text: m["common.team"]()
		},
		{
			link: "#contact",
			text: m["common.contact_page"]()
		}
	];

	function fixLink(link: string) {
		if (link.includes("/")) {
			return resolve(link);
		}
		return link;
	}
</script>

<nav {...restProps}>
	<ul class="flex">
		{#each items as item (item.link)}
			<li>
				<a class="px-3 py-3.5 text-center text-white hover:bg-gray-800" href={fixLink(item.link)}>
					{item.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
