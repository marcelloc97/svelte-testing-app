const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DO_5TGyU.js",app:"_app/immutable/entry/app.BItoGr-B.js",imports:["_app/immutable/entry/start.DO_5TGyU.js","_app/immutable/chunks/BE9ahJBY.js","_app/immutable/chunks/BPWfiyRH.js","_app/immutable/chunks/DmhvSsS-.js","_app/immutable/entry/app.BItoGr-B.js","_app/immutable/chunks/BPWfiyRH.js","_app/immutable/chunks/BgUy-a58.js","_app/immutable/chunks/Cfug8aQt.js","_app/immutable/chunks/CYmYj5HJ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Bbw90dmR.js')),
			__memo(() => import('./chunks/1-9d108ge5.js')),
			__memo(() => import('./chunks/2-CDZftErt.js')),
			__memo(() => import('./chunks/3-Ci75Z_Na.js')),
			__memo(() => import('./chunks/4-DJ-hNVNV.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/demo",
				pattern: /^\/demo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/demo/paraglide",
				pattern: /^\/demo\/paraglide\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
