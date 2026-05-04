<script lang="ts">
	import Icon from "@iconify/svelte";

	import { resolve } from "$app/paths";
	import { m } from "$lib/paraglide/messages";
	import type Button from ".";

	const props: { class?: string } & Button.ButtonProps = $props();
	const {
		type = "button",
		link = "/",
		text,
		icon = null,
		rightIcon = null,
		color = "gray",
		hoverColor = "gray",
		weight = 500,
		hoverWeight = 400,
		size = "md",
		block = false,
		variant = "solid"
	} = props;

	const buttonColor = $derived.by(() => {
		if (!color) return "";
		if (variant === "solid") return `bg-${color}-${weight} hover:bg-${hoverColor}-${hoverWeight}`;

		if (variant === "outline") {
			let outline = `border `;

			if (color === "white" || color === "black") {
				outline += `border-${color} text-${color} bg-${color}/50`;
			} else
				outline += `hover:bg-${hoverColor}-${hoverWeight}/50 border-${color}-${weight} hover:border-${hoverColor}-${hoverWeight} hover:text-${hoverColor}-${hoverWeight}`;

			console.log(outline);
			return outline;
		}

		return `bg-${color}-${weight} hover:bg-${hoverColor}-${hoverWeight}`;
	});

	const buttonSize = $derived.by(() => {
		let newSize: string;
		let width: string = block ? "w-full" : "w-fit";

		switch (size) {
			case "sm":
				newSize = "px-5 py-2 text-sm";
				break;

			case "md":
				newSize = "px-6 py-2.5 text-md";
				break;

			case "lg":
				newSize = "px-8 py-3 text-lg";
				break;

			case "xl":
				newSize = "px-10 py-3.5 text-xl";
				break;

			default:
				newSize = "px-6 py-2.5";
				break;
		}

		return `${newSize} ${width}`;
	});

	const textErrorClasses = "text-gray-400 bg-red-700 hover:text-white hover:bg-red-600";

	let buttonStyle = $state([buttonSize, "cursor-pointer transition-all rounded-4xl"]);

	if (props.class) buttonStyle.push(props.class);
	if (!validateText()) buttonStyle.push(textErrorClasses);
	else {
		buttonStyle = buttonStyle.filter((style) => style !== textErrorClasses);
		buttonStyle.push(buttonColor);
	}

	function getLink() {
		if (link.includes("/")) {
			return resolve(link);
		}

		return link;
	}

	function validateText() {
		if (text?.match(/^(<\\\w+>)|(<\w+>)|(<>)|(<\\>)|(<\w+)|(\w+>)$/gm)) {
			return false;
		}

		return true;
	}
</script>

{#if type === "a"}
	<a href={getLink()} class={buttonStyle}>
		{#if icon}
			<Icon {icon} />
		{/if}

		<span>
			{validateText() ? text : m["validation.text.not_valid"]()}
		</span>

		{#if rightIcon}
			<Icon icon={rightIcon} />
		{/if}
	</a>
{:else}
	<button class={buttonStyle}>
		{#if icon}
			<Icon {icon} />
		{/if}

		<span>
			{validateText() ? text : m["validation.text.not_valid"]()}
		</span>

		{#if rightIcon}
			<Icon icon={rightIcon} />
		{/if}
	</button>
{/if}
