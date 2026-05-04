import { i as initial_base, b as base } from './environment-CYpFI930.js';
import { c as resolve_route, t as try_get_request_store } from './internal-dzHOWTMR.js';

//#region node_modules/@sveltejs/kit/src/runtime/app/paths/server.js
/** @type {import('./client.js').resolve} */
function resolve(id, params) {
	const resolved = resolve_route(id, params);
	{
		const store = try_get_request_store();
		if (store && !store.state.prerendering?.fallback) return (store.event.url.pathname.slice(initial_base.length).split("/").slice(2).map(() => "..").join("/") || ".") + resolved;
	}
	return base + resolved;
}

export { resolve as r };
//# sourceMappingURL=paths-DMj-QCVQ.js.map
