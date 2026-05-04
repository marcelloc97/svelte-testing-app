import type { IconifyIcon } from "@iconify/svelte";

namespace Button {
	type Weight = 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

	interface ButtonProps {
		type: "button" | "a";
		link: string | null;
		text: string | null;
		icon: string | IconifyIcon | null;
		rightIcon: string | IconifyIcon | null;
		color: string;
		hoverColor: string;
		weight: Weight;
		hoverWeight: Weight;
		block: bool;
		size: "sm" | "md" | "lg" | "xl";
		variant: "solid" | "outline" | "flat" | "link";
	}
}

export default Button;
