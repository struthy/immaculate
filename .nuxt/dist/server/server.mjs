import { effectScope, reactive, hasInjectionContext, getCurrentInstance, inject, toRef, version, unref, ref, watchEffect, watch, h, shallowRef, shallowReactive, isReadonly, isRef, isShallow, isReactive, toRaw, onServerPrefetch, resolveDynamicComponent, defineComponent, computed, nextTick, markRaw, resolveComponent, provide, Suspense, mergeProps, Transition, withCtx, createVNode, useSSRContext, defineAsyncComponent, onErrorCaptured, createApp } from "vue";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { $fetch } from "ofetch";
import { createHooks } from "hookable";
import { getContext } from "unctx";
import { sanitizeStatusCode, createError as createError$1, getRequestHeader, setCookie, getCookie, deleteCookie } from "h3";
import { getActiveHead } from "unhead";
import { defineHeadPlugin, composableNames } from "@unhead/shared";
import { START_LOCATION, createMemoryHistory, createRouter as createRouter$1, routerKey, useRoute as useRoute$1, RouterView } from "vue-router";
import { toRouteMatcher, createRouter } from "radix3";
import { defu } from "defu";
import { klona } from "klona";
import { withQuery, hasProtocol, parseURL, isScriptProtocol, joinURL, parseQuery, withTrailingSlash, withoutTrailingSlash } from "ufo";
import "devalue";
import { parse } from "cookie-es";
import destr from "destr";
import { isEqual } from "ohash";
import { asLink, isFilled, asImageWidthSrcSet, asImagePixelDensitySrcSet, asImageSrc, asText, asHTML, createClient, filter, cookie, asLinkAttrs, asDate, documentToLinkField, isRepositoryEndpoint, getRepositoryName } from "@prismicio/client";
import { ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.11.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && process.env.NODE_ENV !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": true };
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta$4 = null;
const __nuxt_page_meta$3 = {
  withHeaderProfile: true,
  withHeaderDivider: true,
  withFooterSignUpForm: true
};
const __nuxt_page_meta$2 = {
  withHeaderProfile: false,
  withHeaderDivider: false,
  withFooterSignUpForm: true
};
const __nuxt_page_meta$1 = {
  withHeaderProfile: true,
  withHeaderDivider: false,
  withFooterSignUpForm: true
};
const __nuxt_page_meta = null;
const _routes = [
  {
    name: "prismic-preview",
    path: "/api/preview",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta$4 == null ? void 0 : __nuxt_page_meta$4.redirect,
    component: () => import("./assets/PrismicPreview-Cuj3r_f9.js").then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.name) ?? "uid",
    path: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.path) ?? "/:uid()",
    meta: __nuxt_page_meta$3 || {},
    alias: (__nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.alias) || [],
    redirect: __nuxt_page_meta$3 == null ? void 0 : __nuxt_page_meta$3.redirect,
    component: () => import("./assets/_uid_-DXcfbyXl.js").then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.name) ?? "articles-uid",
    path: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.path) ?? "/articles/:uid()",
    meta: __nuxt_page_meta$2 || {},
    alias: (__nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.alias) || [],
    redirect: __nuxt_page_meta$2 == null ? void 0 : __nuxt_page_meta$2.redirect,
    component: () => import("./assets/_uid_-CddUfRlq.js").then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.name) ?? "index",
    path: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.path) ?? "/",
    meta: __nuxt_page_meta$1 || {},
    alias: (__nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.alias) || [],
    redirect: __nuxt_page_meta$1 == null ? void 0 : __nuxt_page_meta$1.redirect,
    component: () => import("./assets/index-6dhppHCN.js").then((m) => m.default || m)
  },
  {
    name: "slice-simulator",
    path: "/slice-simulator",
    meta: {},
    alias: [],
    redirect: __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect,
    component: () => import("./assets/slice-simulator-DY3EVvjp.js").then((m) => m.default || m)
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter$1({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from, failure) => {
      delete nuxtApp._processingMiddleware;
      if (failure) {
        await nuxtApp.callHook("page:loading:end");
      }
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        const to = router.resolve(initialURL);
        if ("name" in to) {
          to.name = void 0;
        }
        await router.replace({
          ...to,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function useRequestEvent(nuxtApp = /* @__PURE__ */ useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie2 = ref(cookieValue);
  {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie2.value, cookies[name])) {
        return;
      }
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie2.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie2;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const onNuxtReady = (callback) => {
  {
    return;
  }
};
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  const handler = !import.meta.prerender || !((_a = nuxtApp.ssrContext) == null ? void 0 : _a._sharedPrerenderCache) ? _handler : () => {
    const value = nuxtApp.ssrContext._sharedPrerenderCache.get(key);
    if (value) {
      return value;
    }
    const promise = nuxtApp.runWithContext(_handler);
    nuxtApp.ssrContext._sharedPrerenderCache.set(key, promise);
    return promise;
  };
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.getCachedData = options.getCachedData ?? getDefaultCachedData;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  options.deep = options.deep ?? asyncDataDefaults.deep;
  options.dedupe = options.dedupe ?? "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = null);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(options.getCachedData(key, nuxtApp) ?? options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
async function refreshNuxtData(keys) {
  {
    return Promise.resolve();
  }
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = null;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = null;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key].cancelled = true;
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const prismicKey = Symbol("prismic");
const getSlots = (parent, slots, defaultPayload) => {
  if (typeof parent === "string") {
    return slots.default && slots.default(defaultPayload);
  } else {
    if (slots.default) {
      const content = slots.default(defaultPayload);
      return {
        ...slots,
        default: () => content
      };
    } else {
      return slots;
    }
  }
};
const isInternalURL = (url) => {
  const isInternal = /^\/(?!\/)/.test(url);
  const isSpecialLink = !isInternal && !/^https?:\/\//i.test(url);
  return isInternal && !isSpecialLink;
};
const simplyResolveComponent = (component) => {
  return resolveDynamicComponent(component);
};
const usePrismic = () => {
  return inject(prismicKey, { options: { endpoint: "" } });
};
const defaultInternalComponent = "router-link";
const defaultExternalComponent = "a";
const defaultBlankTargetRelAttribute = "noopener noreferrer";
const usePrismicLink = (props) => {
  const { options } = usePrismic();
  const type = computed(() => {
    var _a, _b;
    const internalComponent = unref(props.internalComponent) || ((_a = options.components) == null ? void 0 : _a.linkInternalComponent) || defaultInternalComponent;
    const externalComponent = unref(props.externalComponent) || ((_b = options.components) == null ? void 0 : _b.linkExternalComponent) || defaultExternalComponent;
    return href.value && isInternalURL(href.value) && !target.value ? internalComponent : externalComponent;
  });
  const href = computed(() => {
    const field = unref(props.field);
    const linkResolver2 = unref(props.linkResolver) ?? options.linkResolver;
    return asLink(field, linkResolver2) ?? "";
  });
  const target = computed(() => {
    const field = unref(props.field);
    const target2 = unref(props.target);
    if (typeof target2 !== "undefined") {
      return target2;
    } else {
      return field && "target" in field && field.target ? field.target : null;
    }
  });
  const rel = computed(() => {
    var _a;
    const rel2 = unref(props.rel);
    if (typeof rel2 !== "undefined") {
      return rel2;
    } else if (target.value === "_blank") {
      const blankTargetRelAttribute = unref(props.blankTargetRelAttribute);
      if (typeof blankTargetRelAttribute !== "undefined") {
        return blankTargetRelAttribute;
      } else {
        return typeof ((_a = options.components) == null ? void 0 : _a.linkBlankTargetRelAttribute) !== "undefined" ? options.components.linkBlankTargetRelAttribute : defaultBlankTargetRelAttribute;
      }
    } else {
      return null;
    }
  });
  return {
    type,
    href,
    target,
    rel
  };
};
const PrismicLinkImpl = /* @__PURE__ */ defineComponent({
  name: "PrismicLink",
  props: {
    field: {
      type: Object,
      required: true
    },
    linkResolver: {
      type: Function,
      default: void 0,
      required: false
    },
    target: {
      type: String,
      default: void 0,
      required: false
    },
    rel: {
      type: String,
      default: void 0,
      required: false
    },
    blankTargetRelAttribute: {
      type: String,
      default: void 0,
      required: false
    },
    internalComponent: {
      type: [String, Object, Function],
      default: void 0,
      required: false
    },
    externalComponent: {
      type: [String, Object, Function],
      default: void 0,
      required: false
    }
  },
  setup(props, { slots }) {
    if (!props.field) {
      return () => null;
    }
    const { type, href, target, rel } = usePrismicLink(props);
    return () => {
      const parent = type.value === "a" ? "a" : simplyResolveComponent(type.value);
      const computedSlots = getSlots(parent, slots, reactive({ href: href.value }));
      if (typeof parent === "string") {
        return h(parent, { href: href.value, target: target.value, rel: rel.value }, computedSlots);
      } else {
        return h(parent, { to: href.value, target: target.value, rel: rel.value }, computedSlots);
      }
    };
  }
});
const PrismicLink = PrismicLinkImpl;
const defaultWrapper$2 = "div";
const PrismicEmbedImpl = /* @__PURE__ */ defineComponent({
  name: "PrismicEmbed",
  props: {
    field: {
      type: Object,
      required: true
    },
    wrapper: {
      type: [String, Object, Function],
      default: void 0,
      required: false
    }
  },
  setup(props) {
    if (!props.field) {
      return () => null;
    }
    return () => {
      return h(simplyResolveComponent(props.wrapper || defaultWrapper$2), {
        "data-oembed": props.field.embed_url,
        "data-oembed-type": props.field.type,
        "data-oembed-provider": props.field.provider_name,
        innerHTML: props.field.html || null
      });
    };
  }
});
const PrismicEmbed = PrismicEmbedImpl;
if (typeof process === "undefined") {
  globalThis.process = { env: {} };
}
const __PRODUCTION__ = process.env.NODE_ENV === "production";
const defaultImageComponent = "img";
const usePrismicImage = (props) => {
  const { options } = usePrismic();
  const asImage = computed(() => {
    var _a, _b;
    const field = unref(props.field);
    if (!isFilled.image(field)) {
      return {
        src: null,
        srcset: null
      };
    }
    const imgixParams = unref(props.imgixParams);
    const widths = unref(props.widths);
    const pixelDensities = unref(props.pixelDensities);
    if (widths) {
      if (!__PRODUCTION__ && pixelDensities) {
        console.warn("[PrismicImage] Only one of `widths` or `pixelDensities` props can be provided. You can resolve this warning by removing either the `widths` or `pixelDensities` prop. `widths` will be used in this case.", props);
      }
      return asImageWidthSrcSet(field, {
        ...imgixParams,
        widths: widths === "defaults" ? (_a = options.components) == null ? void 0 : _a.imageWidthSrcSetDefaults : widths
      });
    } else if (pixelDensities) {
      return asImagePixelDensitySrcSet(field, {
        ...imgixParams,
        pixelDensities: pixelDensities === "defaults" ? (_b = options.components) == null ? void 0 : _b.imagePixelDensitySrcSetDefaults : pixelDensities
      });
    } else {
      return {
        src: asImageSrc(field, imgixParams),
        srcset: null
      };
    }
  });
  const src = computed(() => {
    return asImage.value.src;
  });
  const srcset = computed(() => {
    return asImage.value.srcset;
  });
  const alt = computed(() => {
    return unref(props.field).alt || "";
  });
  const copyright = computed(() => {
    return unref(props.field).copyright || null;
  });
  return {
    src,
    srcset,
    alt,
    copyright
  };
};
const PrismicImageImpl = /* @__PURE__ */ defineComponent({
  name: "PrismicImage",
  props: {
    field: {
      type: Object,
      required: true
    },
    imageComponent: {
      type: [String, Object],
      default: void 0,
      required: false
    },
    imgixParams: {
      type: Object,
      default: void 0,
      required: false
    },
    widths: {
      type: [String, Object],
      default: void 0,
      required: false
    },
    pixelDensities: {
      type: [String, Object],
      default: void 0,
      required: false
    }
  },
  setup(props) {
    if (!props.field) {
      return () => null;
    }
    const { options } = usePrismic();
    const type = computed(() => {
      var _a;
      return props.imageComponent || ((_a = options.components) == null ? void 0 : _a.imageComponent) || defaultImageComponent;
    });
    const { src, srcset, alt, copyright } = usePrismicImage(props);
    return () => {
      const attributes = {
        src: src.value,
        srcset: srcset.value,
        alt: alt.value
      };
      switch (type.value) {
        case "img":
          return h("img", attributes);
        default:
          return h(simplyResolveComponent(type.value), {
            ...attributes,
            copyright: copyright.value
          });
      }
    };
  }
});
const PrismicImage = PrismicImageImpl;
const defaultWrapper$1 = "div";
const usePrismicText = (props) => {
  const text = computed(() => {
    const field = unref(props.field);
    if (!isFilled.richText(field)) {
      return unref(props.fallback) ?? "";
    }
    return asText(unref(field), unref(props.separator));
  });
  return {
    text
  };
};
const PrismicTextImpl = /* @__PURE__ */ defineComponent({
  name: "PrismicText",
  props: {
    field: {
      type: Array,
      default: void 0,
      required: false
    },
    separator: {
      type: String,
      default: void 0,
      required: false
    },
    wrapper: {
      type: [String, Object, Function],
      default: void 0,
      required: false
    },
    fallback: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props) {
    const { text } = usePrismicText(props);
    return () => {
      const parent = simplyResolveComponent(props.wrapper || defaultWrapper$1);
      return h(parent, null, {
        default: () => text.value
      });
    };
  }
});
const PrismicText = PrismicTextImpl;
const defaultWrapper = "div";
const usePrismicRichText = (props) => {
  const { options } = usePrismic();
  const html = computed(() => {
    const field = unref(props.field);
    if (!isFilled.richText(field)) {
      return unref(props.fallback) ?? "";
    }
    const linkResolver2 = unref(props.linkResolver) ?? options.linkResolver;
    const serializer2 = unref(props.serializer) ?? unref(props.htmlSerializer) ?? options.richTextSerializer ?? options.htmlSerializer;
    return asHTML(unref(field), linkResolver2, serializer2);
  });
  return {
    html
  };
};
const PrismicRichTextImpl = /* @__PURE__ */ defineComponent({
  name: "PrismicRichText",
  props: {
    field: {
      type: Array,
      default: void 0,
      required: false
    },
    linkResolver: {
      type: Function,
      default: void 0,
      required: false
    },
    serializer: {
      type: [Function, Object],
      default: void 0,
      required: false
    },
    htmlSerializer: {
      type: [Function, Object],
      default: void 0,
      required: false
    },
    wrapper: {
      type: [String, Object, Function],
      default: void 0,
      required: false
    },
    fallback: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props) {
    const { html } = usePrismicRichText(props);
    const root = ref(null);
    const maybeRouter = inject(routerKey, null);
    if (maybeRouter) {
      let links = [];
      const navigate = function(event) {
        event.preventDefault();
        maybeRouter.push(this.href);
      };
      const addListeners = () => {
        const node = root.value && "$el" in root.value ? root.value.$el : root.value;
        if (node && "querySelectorAll" in node) {
          links = Array.from(node.querySelectorAll("a")).map((element) => {
            const href = element.getAttribute("href");
            if (href && isInternalURL(href)) {
              const listener = navigate.bind({ href });
              element.addEventListener("click", listener);
              return { element, listener };
            } else {
              return false;
            }
          }).filter((link) => link);
        }
      };
      const removeListeners = () => {
        links.forEach(({ element, listener }) => element.removeEventListener("click", listener));
        links = [];
      };
      watch(html, () => {
        removeListeners();
        nextTick(addListeners);
      }, { immediate: true });
    }
    return () => {
      return h(simplyResolveComponent(props.wrapper || defaultWrapper), {
        innerHTML: html.value,
        ref: root
      });
    };
  }
});
const PrismicRichText = PrismicRichTextImpl;
const getSliceComponentProps = (propsHint) => ({
  slice: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  slices: {
    type: Array,
    required: true
  },
  context: {
    type: null,
    required: true
  }
});
const TODOSliceComponent = __PRODUCTION__ ? () => null : /* @__PURE__ */ defineComponent({
  name: "TODOSliceComponent",
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const type = computed(() => {
      return "slice_type" in props.slice ? props.slice.slice_type : props.slice.type;
    });
    watchEffect(() => {
      console.warn(`[SliceZone] Could not find a component for Slice type "${type.value}"`, props.slice);
    });
    return () => {
      return h("section", {
        "data-slice-zone-todo-component": "",
        "data-slice-type": type.value
      }, [`Could not find a component for Slice type "${type.value}"`]);
    };
  }
});
const defineSliceZoneComponents = (components) => {
  const result = {};
  let type;
  for (type in components) {
    const component = components[type];
    result[type] = typeof component === "string" ? component : markRaw(component);
  }
  return result;
};
const SliceZoneImpl = /* @__PURE__ */ defineComponent({
  name: "SliceZone",
  props: {
    slices: {
      type: Array,
      required: true
    },
    components: {
      type: Object,
      default: void 0,
      required: false
    },
    resolver: {
      type: Function,
      default: void 0,
      required: false
    },
    context: {
      type: null,
      default: void 0,
      required: false
    },
    defaultComponent: {
      type: Object,
      default: void 0,
      required: false
    },
    wrapper: {
      type: [String, Object, Function],
      default: void 0,
      required: false
    }
  },
  setup(props) {
    if (!props.slices) {
      return () => null;
    }
    if (!__PRODUCTION__) {
      if (props.resolver) {
        console.warn("The `resolver` prop is deprecated. Please replace it with a components map using the `components` prop.");
      }
    }
    const { options } = usePrismic();
    const renderedSlices = computed(() => {
      return props.slices.map((slice, index) => {
        var _a;
        const type = "slice_type" in slice ? slice.slice_type : slice.type;
        let component = props.components && type in props.components ? props.components[type] : props.defaultComponent || ((_a = options.components) == null ? void 0 : _a.sliceZoneDefaultComponent);
        if (props.resolver) {
          const resolvedComponent = props.resolver({
            slice,
            sliceName: type,
            i: index
          });
          if (resolvedComponent) {
            component = resolvedComponent;
          }
        }
        const key = "id" in slice && typeof slice.id === "string" ? slice.id : `${index}-${JSON.stringify(slice)}`;
        if (component) {
          if (slice.__mapped) {
            const { __mapped, ...mappedProps } = slice;
            return h(simplyResolveComponent(component), {
              key,
              ...mappedProps
            });
          }
          return h(simplyResolveComponent(component), {
            key,
            slice,
            index,
            context: props.context,
            slices: props.slices
          });
        } else {
          return h(simplyResolveComponent(TODOSliceComponent), { key, slice });
        }
      });
    });
    return () => {
      if (props.wrapper) {
        const parent = simplyResolveComponent(props.wrapper);
        if (typeof parent === "string") {
          return h(parent, null, renderedSlices.value);
        } else {
          return h(parent, null, { default: () => renderedSlices.value });
        }
      } else {
        return renderedSlices.value;
      }
    };
  }
});
const SliceZone = SliceZoneImpl;
const createPrismic = (options) => {
  let client2;
  if (options.client) {
    client2 = options.client;
  } else {
    client2 = createClient(options.endpoint, {
      fetch: async (endpoint, options2) => {
        let fetchFunction;
        if (typeof globalThis.fetch === "function") {
          fetchFunction = globalThis.fetch;
        } else {
          fetchFunction = (await import("isomorphic-unfetch")).default;
        }
        return await fetchFunction(endpoint, options2);
      },
      ...options.clientConfig
    });
  }
  const prismicClient = {
    client: client2,
    filter,
    cookie
  };
  const prismicHelpers = {
    asText,
    asHTML: (richTextField, ...config) => {
      const [configOrLinkResolver, maybeHTMLSerializer] = config;
      return asHTML(richTextField, typeof configOrLinkResolver === "function" || configOrLinkResolver == null ? {
        linkResolver: configOrLinkResolver || options.linkResolver,
        serializer: maybeHTMLSerializer || options.richTextSerializer || options.htmlSerializer
      } : {
        linkResolver: options.linkResolver,
        serializer: options.richTextSerializer || options.htmlSerializer,
        ...configOrLinkResolver
      });
    },
    asLink: (linkField, config) => {
      return asLink(linkField, typeof config === "function" ? { linkResolver: config } : {
        linkResolver: options.linkResolver,
        // TODO: For some reasons, TypeScript narrows the type to "unknown" where it's supposed to be a union
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...config
      });
    },
    asLinkAttrs: (linkField, config) => {
      return asLinkAttrs(linkField, {
        // TODO: We can't really retrieve the generic type here, this might cause some unexpected type error in some edge-case scenario
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        linkResolver: options.linkResolver,
        ...config
      });
    },
    asDate,
    asImageSrc,
    asImageWidthSrcSet,
    asImagePixelDensitySrcSet,
    isFilled,
    documentToLinkField
  };
  const prismic = {
    options,
    ...prismicClient,
    ...prismicHelpers,
    install(app) {
      app.provide(prismicKey, this);
      app.config.globalProperties.$prismic = this;
      if (options.injectComponents !== false) {
        app.component(PrismicLink.name, PrismicLink);
        app.component(PrismicEmbed.name, PrismicEmbed);
        app.component(PrismicImage.name, PrismicImage);
        app.component(PrismicText.name, PrismicText);
        app.component(PrismicRichText.name, PrismicRichText);
        app.component(SliceZone.name, SliceZone);
      }
    }
  };
  return prismic;
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = /* @__PURE__ */ useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const client = void 0;
const linkResolver = void 0;
const serializer = {
  heading1: ({ children }) => (
    /* html */
    `<h2 class="font-sans font-semibold tracking-tighter text-slate-800 text-3xl mb-7 mt-12 first:mt-0 last:mb-0">${children}</h2>`
  ),
  heading2: ({ children }) => (
    /* html */
    `<h3 class="font-sans font-semibold tracking-tighter text-slate-800 text-2xl mb-7 last:mb-0">${children}</h3>`
  ),
  heading3: ({ children }) => (
    /* html */
    `<h4 class="font-sans font-semibold tracking-tighter text-slate-800 text-xl mb-7 last:mb-0">${children}</h4>`
  ),
  paragraph: ({ children }) => (
    /* html */
    `<p class="mb-7 last:mb-0">${children}</p>`
  ),
  oList: ({ children }) => (
    /* html */
    `<ol class="mb-7 pl-4 last:mb-0 md:pl-6">${children}</ol>`
  ),
  oListItem: ({ children }) => (
    /* html */
    `<li class="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">${children}</li>`
  ),
  list: ({ children }) => (
    /* html */
    `<ul class="mb-7 pl-4 last:mb-0 md:pl-6">${children}</ul>`
  ),
  listItem: ({ children }) => (
    /* html */
    `<li class="mb-1 list-disc pl-1 last:mb-0 md:pl-2">${children}</li>`
  ),
  preformatted: ({ children }) => (
    /* html */
    `<pre class="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg"><code>${children}</code></pre>`
  ),
  strong: ({ children }) => (
    /* html */
    `<strong class="font-semibold">${children}</strong>`
  ),
  hyperlink: ({ children, node }) => (
    /* html */
    `<a href="${node.data.url}" class="underline decoration-1 underline-offset-2">${children}</a>`
  )
};
const plugin_PWMUhiA9tt = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  var _a;
  const options = (/* @__PURE__ */ useRuntimeConfig()).public.prismic;
  const endpoint = options.environment || options.endpoint || (client == null ? void 0 : client.endpoint) || "";
  const prismicPlugin = createPrismic({
    ...options,
    endpoint,
    client,
    linkResolver,
    richTextSerializer: serializer,
    injectComponents: false,
    // Handled at module level
    components: {
      linkInternalComponent: __nuxt_component_0$1,
      linkExternalComponent: __nuxt_component_0$1,
      ...options.components
    }
  });
  nuxtApp.vueApp.use(prismicPlugin);
  if (options.preview) {
    const previewCookie = useCookie("io.prismic.preview").value;
    {
      const req = (_a = useRequestEvent()) == null ? void 0 : _a.node.req;
      if (req) {
        prismicPlugin.client.enableAutoPreviewsFromReq(req);
      }
    }
    if (previewCookie) {
      try {
        const session = typeof previewCookie === "string" ? JSON.parse(decodeURIComponent(previewCookie)) : previewCookie;
        if (Object.keys(session).some((key) => key in session && typeof session[key] === "object" && session[key] !== null && "preview" in session[key] && session[key].preview)) {
          let afterEachCalled = false;
          onNuxtReady(() => {
            if (!afterEachCalled) {
              refreshNuxtData();
            }
          });
          useRouter().afterEach(() => {
            afterEachCalled = true;
            refreshNuxtData();
          });
        }
      } catch (error) {
        console.warn("Failed to parse Prismic preview cookie", error);
      }
    }
  }
  if (options.toolbar) {
    const repositoryName = isRepositoryEndpoint(endpoint) ? getRepositoryName(endpoint) : endpoint;
    useHead({
      script: [{
        key: "prismic-preview",
        src: `https://static.cdn.prismic.io/prismic.min.js?repo=${repositoryName}&new=true`,
        async: true,
        defer: true,
        crossorigin: "anonymous"
      }]
    });
  } else {
    useCookie("io.prismic.preview").value = null;
  }
  return {
    provide: { prismic: prismicPlugin }
  };
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  plugin_PWMUhiA9tt
];
const layouts = {
  default: () => import("./assets/default-Dh1wKSr-.js").then((m) => m.default || m)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index < newRoute.matched.length - 1;
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import("./assets/error-404-DqBPahdq.js").then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import("./assets/error-500-DDgvRzHO.js").then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);
export {
  PrismicText as P,
  SliceZone as S,
  _export_sfc as _,
  __nuxt_component_0$1 as a,
  usePrismic as b,
  useRouter as c,
  useRoute as d,
  entry$1 as default,
  useAsyncData as e,
  PrismicImage as f,
  PrismicRichText as g,
  PrismicLink as h,
  defineSliceZoneComponents as i,
  getSliceComponentProps as j,
  useHead as u
};
//# sourceMappingURL=server.mjs.map
