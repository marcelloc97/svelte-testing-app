import { M as set, N as LEGACY_PROPS, O as get, P as flushSync, Q as define_property, R as mutable_source, S as init_operations, T as get_first_child, U as get_next_sibling, V as HYDRATION_ERROR, W as set_hydrating, X as set_hydrate_node, Y as hydration_failed, Z as clear_text_content, _ as component_root, $ as hydrate_node, a0 as create_text, a1 as boundary, a2 as array_from, a3 as is_passive_event, a4 as set_active_reaction, a5 as set_active_effect, a6 as active_reaction, a7 as active_effect, a8 as hydrating, a9 as push, aa as component_context, ab as hydration_mismatch, ac as pop, ad as render, k as setContext, g as derived } from './dev-ES4y53n3.js';

// eslint-disable-next-line n/prefer-global/process
const IN_WEBCONTAINER = !!globalThis.process?.versions?.webcontainer;

/** @import { RequestEvent } from '@sveltejs/kit' */
/** @import { RequestStore } from 'types' */
/** @import { AsyncLocalStorage } from 'node:async_hooks' */


/** @type {RequestStore | null} */
let sync_store = null;

/** @type {AsyncLocalStorage<RequestStore | null> | null} */
let als;

import('node:async_hooks')
	.then((hooks) => (als = new hooks.AsyncLocalStorage()))
	.catch(() => {
		// can't use AsyncLocalStorage, but can still call getRequestEvent synchronously.
		// this isn't behind `supports` because it's basically just StackBlitz (i.e.
		// in-browser usage) that doesn't support it AFAICT
	});

function try_get_request_store() {
	return sync_store ?? als?.getStore() ?? null;
}

/**
 * @template T
 * @param {RequestStore | null} store
 * @param {() => T} fn
 */
function with_request_store(store, fn) {
	try {
		sync_store = store;
		return als ? als.run(store, fn) : fn();
	} finally {
		// Since AsyncLocalStorage is not working in webcontainers, we don't reset `sync_store`
		// and handle only one request at a time in `src/runtime/server/index.js`.
		if (!IN_WEBCONTAINER) {
			sync_store = null;
		}
	}
}

//#region node_modules/@sveltejs/kit/src/utils/url.js
/**
* Matches a URI scheme. See https://www.rfc-editor.org/rfc/rfc3986#section-3.1
* @type {RegExp}
*/
var internal = new URL("sveltekit-internal://");
/**
* @param {string} base
* @param {string} path
*/
function resolve(base, path) {
	if (path[0] === "/" && path[1] === "/") return path;
	let url = new URL(base, internal);
	url = new URL(path, url);
	return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
/**
* @param {string} path
* @param {import('types').TrailingSlash} trailing_slash
*/
function normalize_path(path, trailing_slash) {
	if (path === "/" || trailing_slash === "ignore") return path;
	if (trailing_slash === "never") return path.endsWith("/") ? path.slice(0, -1) : path;
	else if (trailing_slash === "always" && !path.endsWith("/")) return path + "/";
	return path;
}
/**
* Decode pathname excluding %25 to prevent further double decoding of params
* @param {string} pathname
*/
function decode_pathname(pathname) {
	return pathname.split("%25").map(decodeURI).join("%25");
}
/** @param {Record<string, string>} params */
function decode_params(params) {
	for (const key in params) params[key] = decodeURIComponent(params[key]);
	return params;
}
/**
* @param {URL} url
* @param {() => void} callback
* @param {(search_param: string) => void} search_params_callback
* @param {boolean} [allow_hash]
*/
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
	const tracked = new URL(url);
	Object.defineProperty(tracked, "searchParams", {
		value: new Proxy(tracked.searchParams, { get(obj, key) {
			if (key === "get" || key === "getAll" || key === "has") return (param, ...rest) => {
				search_params_callback(param);
				return obj[key](param, ...rest);
			};
			callback();
			const value = Reflect.get(obj, key);
			return typeof value === "function" ? value.bind(obj) : value;
		} }),
		enumerable: true,
		configurable: true
	});
	/**
	* URL properties that could change during the lifetime of the page,
	* which excludes things like `origin`
	*/
	const tracked_url_properties = [
		"href",
		"pathname",
		"search",
		"toString",
		"toJSON"
	];
	if (allow_hash) tracked_url_properties.push("hash");
	for (const property of tracked_url_properties) Object.defineProperty(tracked, property, {
		get() {
			callback();
			return url[property];
		},
		enumerable: true,
		configurable: true
	});
	tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
		return inspect(url, opts);
	};
	tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
		return inspect(url.searchParams, opts);
	};
	if (!allow_hash) disable_hash(tracked);
	return tracked;
}
/**
* Disallow access to `url.hash` on the server and in `load`
* @param {URL} url
*/
function disable_hash(url) {
	allow_nodejs_console_log(url);
	Object.defineProperty(url, "hash", { get() {
		throw new Error("Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead");
	} });
}
/**
* Disallow access to `url.search` and `url.searchParams` during prerendering
* @param {URL} url
*/
function disable_search(url) {
	allow_nodejs_console_log(url);
	for (const property of ["search", "searchParams"]) Object.defineProperty(url, property, { get() {
		throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
	} });
}
/**
* Allow URL to be console logged, bypassing disabled properties.
* @param {URL} url
*/
function allow_nodejs_console_log(url) {
	url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
		return inspect(new URL(url), opts);
	};
}
//#endregion
//#region node_modules/@sveltejs/kit/src/utils/routing.js
/**
* Returns `false` for `(group)` segments
* @param {string} segment
*/
function affects_path(segment) {
	return segment !== "" && !/^\([^)]+\)$/.test(segment);
}
/**
* Splits a route id into its segments, removing segments that
* don't affect the path (i.e. groups). The root route is represented by `/`
* and will be returned as `['']`.
* @param {string} route
* @returns string[]
*/
function get_route_segments(route) {
	return route.slice(1).split("/").filter(affects_path);
}
/**
* @param {RegExpMatchArray} match
* @param {import('types').RouteParam[]} params
* @param {Record<string, import('@sveltejs/kit').ParamMatcher>} matchers
*/
function exec(match, params, matchers) {
	/** @type {Record<string, string>} */
	const result = {};
	const values = match.slice(1);
	const values_needing_match = values.filter((value) => value !== void 0);
	let buffered = 0;
	for (let i = 0; i < params.length; i += 1) {
		const param = params[i];
		let value = values[i - buffered];
		if (param.chained && param.rest && buffered) {
			value = values.slice(i - buffered, i + 1).filter((s) => s).join("/");
			buffered = 0;
		}
		if (value === void 0) if (param.rest) value = "";
		else continue;
		if (!param.matcher || matchers[param.matcher](value)) {
			result[param.name] = value;
			const next_param = params[i + 1];
			const next_value = values[i + 1];
			if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) buffered = 0;
			if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) buffered = 0;
			continue;
		}
		if (param.optional && param.chained) {
			buffered++;
			continue;
		}
		return;
	}
	if (buffered) return;
	return result;
}
var basic_param_pattern = /\[(\[)?(\.\.\.)?(\w+?)(?:=(\w+))?\]\]?/g;
/**
* Populate a route ID with params to resolve a pathname.
* @example
* ```js
* resolveRoute(
*   `/blog/[slug]/[...somethingElse]`,
*   {
*     slug: 'hello-world',
*     somethingElse: 'something/else'
*   }
* ); // `/blog/hello-world/something/else`
* ```
* @param {string} id
* @param {Record<string, string | undefined>} params
* @returns {string}
*/
function resolve_route(id, params) {
	const segments = get_route_segments(id);
	const has_id_trailing_slash = id != "/" && id.endsWith("/");
	return "/" + segments.map((segment) => segment.replace(basic_param_pattern, (_, optional, rest, name) => {
		const param_value = params[name];
		if (!param_value) {
			if (optional) return "";
			if (rest && param_value !== void 0) return "";
			throw new Error(`Missing parameter '${name}' in route ${id}`);
		}
		if (param_value.startsWith("/") || param_value.endsWith("/")) throw new Error(`Parameter '${name}' in route ${id} cannot start or end with a slash -- this would cause an invalid route like foo//bar`);
		return param_value;
	})).filter(Boolean).join("/") + (has_id_trailing_slash ? "/" : "");
}
/**
* Find the first route that matches the given path
* @template {{pattern: RegExp, params: import('types').RouteParam[]}} Route
* @param {string} path - The decoded pathname to match
* @param {Route[]} routes
* @param {Record<string, import('@sveltejs/kit').ParamMatcher>} matchers
* @returns {{ route: Route, params: Record<string, string> } | null}
*/
function find_route(path, routes, matchers) {
	for (const route of routes) {
		const match = route.pattern.exec(path);
		if (!match) continue;
		const matched = exec(match, route.params, matchers);
		if (matched) return {
			route,
			params: decode_params(matched)
		};
	}
	return null;
}

//#region node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
var event_symbol = Symbol("events");
/** @type {Set<string>} */
var all_registered_events = /* @__PURE__ */ new Set();
/** @type {Set<(events: Array<string>) => void>} */
var root_event_handles = /* @__PURE__ */ new Set();
var last_propagated_event = null;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = event.composedPath?.() || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			/** @type {null | Element} */
			var parent_element = current_target.assignedSlot || current_target.parentNode || current_target.host || null;
			try {
				var delegated = current_target[event_symbol]?.[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble || parent_element === handler_element || parent_element === null) break;
			current_target = parent_element;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
//#endregion
//#region node_modules/svelte/src/internal/client/dom/template.js
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { TemplateStructure } from './types' */
/**
* @param {TemplateNode} start
* @param {TemplateNode | null} end
*/
function assign_nodes(start, end) {
	var effect = active_effect;
	if (effect.nodes === null) effect.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
/**
* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
* Transitions will play during the initial render unless the `intro` option is set to `false`.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {MountOptions<Props>} options
* @returns {Exports}
*/
function mount(component, options) {
	return _mount(component, options);
}
/**
* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {{} extends Props ? {
* 		target: Document | Element | ShadowRoot;
* 		props?: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	} : {
* 		target: Document | Element | ShadowRoot;
* 		props: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	}} options
* @returns {Exports}
*/
function hydrate(component, options) {
	init_operations();
	options.intro = options.intro ?? false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component, {
			...options,
			anchor
		});
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		init_operations();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
/** @type {Map<EventTarget, Map<string, number>>} */
var listeners = /* @__PURE__ */ new Map();
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions} options
* @returns {Exports}
*/
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
	init_operations();
	/** @type {Exports} */
	var component = void 0;
	var unmount = component_root(() => {
		var anchor_node = anchor ?? target.appendChild(create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
			push({});
			var ctx = component_context;
			if (context) ctx.c = context;
			if (events)
 /** @type {any} */ props.$$events = events;
			if (hydrating) assign_nodes(anchor_node, null);
			component = Component(anchor_node, props) || {};
			if (hydrating) {
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			pop();
		}, transformError);
		/** @type {Set<string>} */
		var registered_events = /* @__PURE__ */ new Set();
		/** @param {Array<string>} events */
		var event_handle = (events) => {
			for (var i = 0; i < events.length; i++) {
				var event_name = events[i];
				if (registered_events.has(event_name)) continue;
				registered_events.add(event_name);
				var passive = is_passive_event(event_name);
				for (const node of [target, document]) {
					var counts = listeners.get(node);
					if (counts === void 0) {
						counts = /* @__PURE__ */ new Map();
						listeners.set(node, counts);
					}
					var count = counts.get(event_name);
					if (count === void 0) {
						node.addEventListener(event_name, handle_event_propagation, { passive });
						counts.set(event_name, 1);
					} else counts.set(event_name, count + 1);
				}
			}
		};
		event_handle(array_from(all_registered_events));
		root_event_handles.add(event_handle);
		return () => {
			for (var event_name of registered_events) for (const node of [target, document]) {
				var counts = listeners.get(node);
				var count = counts.get(event_name);
				if (--count == 0) {
					node.removeEventListener(event_name, handle_event_propagation);
					counts.delete(event_name);
					if (counts.size === 0) listeners.delete(node);
				} else counts.set(event_name, count);
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) anchor_node.parentNode?.removeChild(anchor_node);
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
/**
* References of the components that were mounted or hydrated.
* Uses a `WeakMap` to avoid memory leaks.
*/
var mounted_components = /* @__PURE__ */ new WeakMap();
/**
* Unmounts a component that was previously mounted using `mount` or `hydrate`.
*
* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
*
* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
*
* ```js
* import { mount, unmount } from 'svelte';
* import App from './App.svelte';
*
* const app = mount(App, { target: document.body });
*
* // later...
* unmount(app, { outro: true });
* ```
* @param {Record<string, any>} component
* @param {{ outro?: boolean }} [options]
* @returns {Promise<void>}
*/
function unmount(component, options) {
	const fn = mounted_components.get(component);
	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}
	return Promise.resolve();
}
/**
* Takes the component function and returns a Svelte 4 compatible component constructor.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {SvelteComponent<Props, Events, Slots> | Component<Props>} component
* @returns {ComponentType<SvelteComponent<Props, Events, Slots> & Exports>}
*/
function asClassComponent$1(component) {
	return class extends Svelte4Component {
		/** @param {any} options */
		constructor(options) {
			super({
				component,
				...options
			});
		}
	};
}
/**
* Support using the component as both a class and function during the transition period
* @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
*/
var Svelte4Component = class {
	/** @type {any} */
	#events;
	/** @type {Record<string, any>} */
	#instance;
	/**
	* @param {ComponentConstructorOptions & {
	*  component: any;
	* }} options
	*/
	constructor(options) {
		var sources = /* @__PURE__ */ new Map();
		/**
		* @param {string | symbol} key
		* @param {unknown} value
		*/
		var add_source = (key, value) => {
			var s = /* @__PURE__ */ mutable_source(value, false, false);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy({
			...options.props || {},
			$$events: {}
		}, {
			get(target, prop) {
				return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
			},
			has(target, prop) {
				if (prop === LEGACY_PROPS) return true;
				get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
				return Reflect.has(target, prop);
			},
			set(target, prop, value) {
				set(sources.get(prop) ?? add_source(prop, value), value);
				return Reflect.set(target, prop, value);
			}
		});
		this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: options.intro ?? false,
			recover: options.recover,
			transformError: options.transformError
		});
		if ((!options?.props?.$$host || options.sync === false)) flushSync();
		this.#events = props.$$events;
		for (const key of Object.keys(this.#instance)) {
			if (key === "$set" || key === "$destroy" || key === "$on") continue;
			define_property(this, key, {
				get() {
					return this.#instance[key];
				},
				set(value) {
					this.#instance[key] = value;
				},
				enumerable: true
			});
		}
		this.#instance.$set = (next) => {
			Object.assign(props, next);
		};
		this.#instance.$destroy = () => {
			unmount(this.#instance);
		};
	}
	/** @param {Record<string, any>} props */
	$set(props) {
		this.#instance.$set(props);
	}
	/**
	* @param {string} event
	* @param {(...args: any[]) => any} callback
	* @returns {any}
	*/
	$on(event, callback) {
		this.#events[event] = this.#events[event] || [];
		/** @param {any[]} args */
		const cb = (...args) => callback.call(this, ...args);
		this.#events[event].push(cb);
		return () => {
			this.#events[event] = this.#events[event].filter(
				/** @param {any} fn */
				(fn) => fn !== cb
			);
		};
	}
	$destroy() {
		this.#instance.$destroy();
	}
};

//#region \0virtual:__sveltekit/server
var read_implementation = null;
function set_read_implementation(fn) {
	read_implementation = fn;
}
//#endregion
//#region node_modules/svelte/src/legacy/legacy-server.js
/** @import { SvelteComponent } from '../index.js' */
/** @import { Csp } from '#server' */
/** @typedef {{ head: string, html: string, css: { code: string, map: null }; hashes?: { script: `sha256-${string}`[] } }} LegacyRenderResult */
/**
* Takes a Svelte 5 component and returns a Svelte 4 compatible component constructor.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {SvelteComponent<Props, Events, Slots>} component
* @returns {typeof SvelteComponent<Props, Events, Slots> & Exports}
*/
function asClassComponent(component) {
	const component_constructor = asClassComponent$1(component);
	/** @type {(props?: {}, opts?: { $$slots?: {}; context?: Map<any, any>; csp?: Csp; transformError?: (error: unknown) => unknown }) => LegacyRenderResult & PromiseLike<LegacyRenderResult> } */
	const _render = (props, { context, csp, transformError } = {}) => {
		const result = render(component, {
			props,
			context,
			csp,
			transformError
		});
		const munged = Object.defineProperties({}, {
			css: { value: {
				code: "",
				map: null
			} },
			head: { get: () => result.head },
			html: { get: () => result.body },
			then: { value: (onfulfilled, onrejected) => {
				{
					const user_result = onfulfilled({
						css: munged.css,
						head: munged.head,
						html: munged.html
					});
					return Promise.resolve(user_result);
				}
			} }
		});
		return munged;
	};
	component_constructor.render = _render;
	return component_constructor;
}
//#endregion
//#region .svelte-kit/generated/root.svelte
function Root($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { stores, page, constructors, components = [], form, data_0 = null, data_1 = null } = $$props;
		setContext("__svelte__", stores);
		stores.page.set(page);
		const Pyramid_1 = derived(() => constructors[1]);
		if (constructors[1]) {
			$$renderer.push("<!--[0-->");
			const Pyramid_0 = constructors[0];
			if (Pyramid_0) {
				$$renderer.push("<!--[-->");
				Pyramid_0($$renderer, {
					data: data_0,
					form,
					params: page.params,
					children: ($$renderer) => {
						if (Pyramid_1()) {
							$$renderer.push("<!--[-->");
							Pyramid_1()($$renderer, {
								data: data_1,
								form,
								params: page.params
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else {
			$$renderer.push("<!--[-1-->");
			const Pyramid_0 = constructors[0];
			if (Pyramid_0) {
				$$renderer.push("<!--[-->");
				Pyramid_0($$renderer, {
					data: data_0,
					form,
					params: page.params
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region .svelte-kit/generated/server/internal.js
var options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {
		"mode": "auto",
		"directives": {
			"upgrade-insecure-requests": false,
			"block-all-mixed-content": false
		},
		"reportOnly": {
			"upgrade-insecure-requests": false,
			"block-all-mixed-content": false
		}
	},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: "PUBLIC_",
	env_private_prefix: "",
	hash_routing: false,
	hooks: null,
	preload_strategy: "modulepreload",
	root: asClassComponent(Root),
	service_worker: false,
	service_worker_options: void 0,
	server_error_boundaries: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n\n<html lang=\"%paraglide.lang%\" dir=\"%paraglide.dir%\">\n	<head>\n		<meta charset=\"utf-8\" />\n\n		<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n		<meta name=\"text-scale\" content=\"scale\" />\n		" + head + "\n	</head>\n\n	<body data-sveltekit-preload-data=\"hover\" class=\"min-h-dvh bg-gray-800 text-white\">\n		<div style=\"display: contents\">" + body + "</div>\n	</body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n	<head>\n		<meta charset=\"utf-8\" />\n		<title>" + message + "</title>\n\n		<style>\n			body {\n				--bg: white;\n				--fg: #222;\n				--divider: #ccc;\n				background: var(--bg);\n				color: var(--fg);\n				font-family:\n					system-ui,\n					-apple-system,\n					BlinkMacSystemFont,\n					'Segoe UI',\n					Roboto,\n					Oxygen,\n					Ubuntu,\n					Cantarell,\n					'Open Sans',\n					'Helvetica Neue',\n					sans-serif;\n				display: flex;\n				align-items: center;\n				justify-content: center;\n				height: 100vh;\n				margin: 0;\n			}\n\n			.error {\n				display: flex;\n				align-items: center;\n				max-width: 32rem;\n				margin: 0 1rem;\n			}\n\n			.status {\n				font-weight: 200;\n				font-size: 3rem;\n				line-height: 1;\n				position: relative;\n				top: -0.05rem;\n			}\n\n			.message {\n				border-left: 1px solid var(--divider);\n				padding: 0 0 0 1rem;\n				margin: 0 0 0 1rem;\n				min-height: 2.5rem;\n				display: flex;\n				align-items: center;\n			}\n\n			.message h1 {\n				font-weight: 400;\n				font-size: 1em;\n				margin: 0;\n			}\n\n			@media (prefers-color-scheme: dark) {\n				body {\n					--bg: #222;\n					--fg: #ddd;\n					--divider: #666;\n				}\n			}\n		</style>\n	</head>\n	<body>\n		<div class=\"error\">\n			<span class=\"status\">" + status + "</span>\n			<div class=\"message\">\n				<h1>" + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
	},
	version_hash: "108c90e"
};
async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	({handle, handleFetch, handleError, handleValidationError, init} = await import('./hooks.server-CP7fF8Yg.js'));
	let reroute;
	let transport;
	({reroute, transport} = await import('./hooks.universal-BAfd8nzj.js'));
	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { disable_search as a, read_implementation as b, resolve_route as c, decode_pathname as d, find_route as f, get_hooks as g, make_trackable as m, normalize_path as n, options as o, resolve as r, set_read_implementation as s, try_get_request_store as t, with_request_store as w };
//# sourceMappingURL=internal-dzHOWTMR.js.map
