import { d as escape_html } from './dev-ES4y53n3.js';
import './runtime-DVZBPa9d.js';
import { i as hello_world } from './messages-CQ-WFi1H.js';

//#region src/routes/demo/paraglide/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<h1>${escape_html(hello_world({ name: "SvelteKit User" }))}</h1> <div><button>en</button> <button>pt-br</button></div> <p>If you use VSCode, install the <a href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension" target="_blank">Sherlock i18n extension</a> for a better i18n experience.</p>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-R6RcXjKW.js.map
