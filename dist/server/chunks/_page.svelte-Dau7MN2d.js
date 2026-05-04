import { d as escape_html, c as attr } from './dev-ES4y53n3.js';
import { B as Button } from './dist-D4kYVdj0.js';
import { h as home_page_intro_p, d as home_page_section_team_title, e as home_page_team_p, f as home_page_calling_p, b as common_contact_page, g as common_join_us } from './messages-CQ-WFi1H.js';
import './runtime-DVZBPa9d.js';

//#region src/lib/assets/programmer.webp
var programmer_default = "/_app/immutable/assets/programmer.Bc41xg-y.webp";
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="flex items-center justify-between bg-white px-20 py-8 text-gray-900"><div class="flex w-1/2 flex-col"><h3 class="text-heading text-5xl font-bold tracking-tight">Falcon Studios</h3> <p class="mt-2 text-lg">${escape_html(home_page_intro_p())}</p> `);
		Button($$renderer, {
			outline: true,
			pill: true,
			tag: "a",
			href: "#contact",
			color: "primary",
			class: "mt-4 w-fit transition-colors",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html(common_contact_page())}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <img${attr("src", programmer_default)} alt="man programming"/></section> <section id="team" class="flex items-center justify-between bg-cover px-20 py-8"><div class="flex w-1/2 flex-col"><h3 class="text-heading text-5xl font-bold tracking-tight">${escape_html(home_page_section_team_title())}</h3> <p class="mt-2 text-lg">${escape_html(home_page_team_p())}
			${escape_html(home_page_calling_p())}</p> `);
		Button($$renderer, {
			outline: true,
			pill: true,
			tag: "a",
			href: "#team",
			class: "mt-4 w-fit border-gray-50 text-gray-50 transition-colors hover:bg-gray-50 hover:text-gray-900",
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html(common_join_us())}`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <img${attr("src", programmer_default)} alt="man programming"/></section>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dau7MN2d.js.map
