import { _ as _sfc_main$6 } from './Bounded-CqZsWWMI.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, renderList } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderList } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/server-renderer/index.mjs';
import { d as useRoute, a as __nuxt_component_0$1, f as PrismicImage, P as PrismicText, b as usePrismic, e as useAsyncData, h as PrismicLink, _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$5 } from './Heading-B2lfgbt7.mjs';
import { _ as __nuxt_component_1$1 } from './HorizontalDivider-B6YJmzjp.mjs';
import { u as useSettings } from './useSettings-CLIk7AWv.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/ofetch/dist/node.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/hookable/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/unctx/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/h3/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/unhead/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/@unhead/shared/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/radix3/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/defu/dist/defu.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/klona/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/ufo/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/destr/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/ohash/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/@prismicio/client/dist/index.js';
import '../runtime.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/unenv/runtime/fetch/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/scule/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/unstorage/dist/index.mjs';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/webdev/Tutorials/nuxt-blog/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/pathe/dist/index.mjs';

const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<li${ssrRenderAttrs(mergeProps({ class: "font-semibold tracking-tight text-slate-800" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</li>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderNavItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "HeaderProfile",
  __ssrInlineRender: true,
  props: {
    name: {
      type: Object,
      default: void 0
    },
    description: {
      type: Object,
      default: void 0
    },
    profilePicture: {
      type: Object,
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_PrismicImage = PrismicImage;
      const _component_Heading = _sfc_main$5;
      const _component_PrismicText = PrismicText;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4" }, _attrs))}><div class="grid max-w-lg grid-cols-1 justify-items-center gap-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        "tab-index": "-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300"${_scopeId}>`);
            if ((_a = __props.profilePicture) == null ? void 0 : _a.url) {
              _push2(ssrRenderComponent(_component_PrismicImage, {
                field: __props.profilePicture,
                class: "object-cover"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative h-40 w-40 overflow-hidden rounded-full bg-slate-300" }, [
                ((_b = __props.profilePicture) == null ? void 0 : _b.url) ? (openBlock(), createBlock(_component_PrismicImage, {
                  key: 0,
                  field: __props.profilePicture,
                  class: "object-cover"
                }, null, 8, ["field"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$prismic.asText(__props.name) || _ctx.$prismic.asText(__props.description)) {
        _push(`<div class="grid grid-cols-1 gap-2 text-center">`);
        if (_ctx.$prismic.asText(__props.name)) {
          _push(ssrRenderComponent(_component_Heading, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(_ctx.$prismic.asText(__props.name))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$prismic.asText(__props.name)), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtLink, { to: "/" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$prismic.asText(__props.name)), 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$prismic.asText(__props.description)) {
          _push(ssrRenderComponent(_component_PrismicText, {
            field: __props.description,
            wrapper: "p",
            class: "font-serif text-2xl italic leading-normal tracking-tight text-slate-500"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderProfile.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const useNavigation = () => {
  const prismic = usePrismic();
  return useAsyncData("$navigation", () => prismic.client.getSingle("navigation")).data;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    withDivider: {
      type: Boolean,
      default: true
    },
    withProfile: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const navigation = useNavigation();
    const settings = useSettings();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bounded = _sfc_main$6;
      const _component_HeaderNavItem = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_PrismicLink = PrismicLink;
      const _component_HeaderProfile = _sfc_main$3;
      const _component_HorizontalDivider = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Bounded, mergeProps({ as: "header" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 justify-items-center gap-20"${_scopeId}><nav${_scopeId}><ul class="flex flex-wrap justify-center gap-10"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_HeaderNavItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2;
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.$prismic.asText((_a2 = unref(navigation)) == null ? void 0 : _a2.data.homepageLabel))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.$prismic.asText((_b2 = unref(navigation)) == null ? void 0 : _b2.data.homepageLabel)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, { to: "/" }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString(_ctx.$prismic.asText((_a2 = unref(navigation)) == null ? void 0 : _a2.data.homepageLabel)), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList((_a = unref(navigation)) == null ? void 0 : _a.data.links, (item) => {
              _push2(ssrRenderComponent(_component_HeaderNavItem, {
                key: _ctx.$prismic.asText(item.label)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_PrismicLink, {
                      field: item.link
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.$prismic.asText(item.label))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$prismic.asText(item.label)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_PrismicLink, {
                        field: item.link
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$prismic.asText(item.label)), 1)
                        ]),
                        _: 2
                      }, 1032, ["field"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></ul></nav>`);
            if (__props.withProfile) {
              _push2(ssrRenderComponent(_component_HeaderProfile, {
                name: (_b = unref(settings)) == null ? void 0 : _b.data.name,
                description: (_c = unref(settings)) == null ? void 0 : _c.data.description,
                "profile-picture": (_d = unref(settings)) == null ? void 0 : _d.data.profilePicture
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.withDivider) {
              _push2(ssrRenderComponent(_component_HorizontalDivider, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 justify-items-center gap-20" }, [
                createVNode("nav", null, [
                  createVNode("ul", { class: "flex flex-wrap justify-center gap-10" }, [
                    createVNode(_component_HeaderNavItem, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, { to: "/" }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createTextVNode(toDisplayString(_ctx.$prismic.asText((_a2 = unref(navigation)) == null ? void 0 : _a2.data.homepageLabel)), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList((_e = unref(navigation)) == null ? void 0 : _e.data.links, (item) => {
                      return openBlock(), createBlock(_component_HeaderNavItem, {
                        key: _ctx.$prismic.asText(item.label)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_PrismicLink, {
                            field: item.link
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$prismic.asText(item.label)), 1)
                            ]),
                            _: 2
                          }, 1032, ["field"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ]),
                __props.withProfile ? (openBlock(), createBlock(_component_HeaderProfile, {
                  key: 0,
                  name: (_f = unref(settings)) == null ? void 0 : _f.data.name,
                  description: (_g = unref(settings)) == null ? void 0 : _g.data.description,
                  "profile-picture": (_h = unref(settings)) == null ? void 0 : _h.data.profilePicture
                }, null, 8, ["name", "description", "profile-picture"])) : createCommentVNode("", true),
                __props.withDivider ? (openBlock(), createBlock(_component_HorizontalDivider, { key: 1 })) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  props: {
    withSignUpForm: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bounded = _sfc_main$6;
      const _component_HorizontalDivider = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Bounded, mergeProps({ as: "footer" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 justify-items-center gap-24"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_HorizontalDivider, null, null, _parent2, _scopeId));
            _push2(`<div class="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight text-slate-500"${_scopeId}> Proudly published using <a href="https://prismic.io" class="text-slate-700"${_scopeId}>Prismic</a></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 justify-items-center gap-24" }, [
                createVNode(_component_HorizontalDivider),
                createVNode("div", { class: "mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight text-slate-500" }, [
                  createTextVNode(" Proudly published using "),
                  createVNode("a", {
                    href: "https://prismic.io",
                    class: "text-slate-700"
                  }, "Prismic")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$2;
      const _component_Footer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-slate-700" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Header, {
        "with-profile": unref(route).meta.withHeaderProfile,
        "with-divider": unref(route).meta.withHeaderDivider
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_Footer, {
        "with-sign-up-form": unref(route).meta.withFooterSignUpForm
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-Dh1wKSr-.mjs.map
