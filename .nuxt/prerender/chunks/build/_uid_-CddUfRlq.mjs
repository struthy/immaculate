import { _ as _sfc_main$1 } from './Bounded-CqZsWWMI.mjs';
import { b as usePrismic, d as useRoute, e as useAsyncData, u as useHead, a as __nuxt_component_0$1, P as PrismicText, f as PrismicImage, g as PrismicRichText, S as SliceZone, h as PrismicLink } from './server.mjs';
import { _ as __nuxt_component_1 } from './HorizontalDivider-B6YJmzjp.mjs';
import { _ as _sfc_main$2 } from './Heading-B2lfgbt7.mjs';
import { u as useSettings } from './useSettings-CLIk7AWv.mjs';
import { defineComponent, computed, withCtx, createTextVNode, createVNode, unref, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/server-renderer/index.mjs';
import { c as components } from './index-akQ3gW3N.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/ofetch/dist/node.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/hookable/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/unctx/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/h3/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/unhead/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/radix3/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/defu/dist/defu.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/klona/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/ufo/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/cookie-es/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/destr/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/ohash/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/@prismicio/client/dist/index.js';
import '../runtime.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/scule/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/unstorage/dist/index.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/nuxt/dist/core/runtime/nitro/cache-driver.js';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/unstorage/drivers/fs-lite.mjs';
import 'node:fs';
import 'node:url';
import 'file:///home/runner/work/immaculate/immaculate/node_modules/pathe/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[uid]",
  __ssrInlineRender: true,
  setup(__props) {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    const prismic = usePrismic();
    const route = useRoute();
    const { data: article } = useAsyncData(
      `articles/${route.params.uid}`,
      () => prismic.client.getByUID("article", route.params.uid)
    );
    const { data: latestArticles } = useAsyncData(
      "$latestArticles",
      () => prismic.client.getAllByType("article", {
        limit: 3,
        orderings: [
          { field: "my.article.publishDate", direction: "desc" },
          { field: "document.first_publication_date", direction: "desc" }
        ]
      })
    );
    const settings = useSettings();
    useHead({
      title: computed(() => {
        var _a, _b;
        return `${prismic.asText((_a = article.value) == null ? void 0 : _a.data.title)} | ${prismic.asText((_b = settings.value) == null ? void 0 : _b.data.name)}`;
      })
    });
    const formatDate = (article2) => {
      const date = prismic.asDate((article2 == null ? void 0 : article2.data.publishDate) || (article2 == null ? void 0 : article2.first_publication_date));
      return dateFormatter.format(date || void 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b;
      const _component_Bounded = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_PrismicText = PrismicText;
      const _component_PrismicImage = PrismicImage;
      const _component_PrismicRichText = PrismicRichText;
      const _component_SliceZone = SliceZone;
      const _component_HorizontalDivider = __nuxt_component_1;
      const _component_Heading = _sfc_main$2;
      const _component_PrismicLink = PrismicLink;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Bounded, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "font-semibold tracking-tight text-slate-400"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u2190 Back to articles `);
                } else {
                  return [
                    createTextVNode(" \u2190 Back to articles ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/",
                class: "font-semibold tracking-tight text-slate-400"
              }, {
                default: withCtx(() => [
                  createTextVNode(" \u2190 Back to articles ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<article>`);
      _push(ssrRenderComponent(_component_Bounded, { class: "pb-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a22, _b2, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(_component_PrismicText, {
              field: (_a22 = unref(article)) == null ? void 0 : _a22.data.title,
              wrapper: "h1",
              class: "mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl"
            }, null, _parent2, _scopeId));
            _push2(`<p class="font-serif italic tracking-tighter text-slate-500"${_scopeId}>${ssrInterpolate(formatDate(unref(article)))}</p>`);
            _push2(ssrRenderComponent(_component_PrismicImage, {
              field: (_b2 = unref(article)) == null ? void 0 : _b2.data.featuredImage,
              class: "mb-4"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_PrismicRichText, {
              field: (_c = unref(article)) == null ? void 0 : _c.data.text
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PrismicText, {
                field: (_d = unref(article)) == null ? void 0 : _d.data.title,
                wrapper: "h1",
                class: "mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl"
              }, null, 8, ["field"]),
              createVNode("p", { class: "font-serif italic tracking-tighter text-slate-500" }, toDisplayString(formatDate(unref(article))), 1),
              createVNode(_component_PrismicImage, {
                field: (_e = unref(article)) == null ? void 0 : _e.data.featuredImage,
                class: "mb-4"
              }, null, 8, ["field"]),
              createVNode(_component_PrismicRichText, {
                field: (_f = unref(article)) == null ? void 0 : _f.data.text
              }, null, 8, ["field"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_SliceZone, {
        slices: (_a2 = (_a = unref(article)) == null ? void 0 : _a.data.slices) != null ? _a2 : [],
        components: unref(components)
      }, null, _parent));
      _push(`</article>`);
      if ((_b = unref(latestArticles)) == null ? void 0 : _b.length) {
        _push(ssrRenderComponent(_component_Bounded, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 justify-items-center gap-16 md:gap-24"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_HorizontalDivider, null, null, _parent2, _scopeId));
              _push2(`<div class="w-full"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Heading, {
                size: "2xl",
                class: "mb-10"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Latest articles `);
                  } else {
                    return [
                      createTextVNode(" Latest articles ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<ul class="grid grid-cols-1 gap-12"${_scopeId}><!--[-->`);
              ssrRenderList(unref(latestArticles), (latestArticle) => {
                _push2(`<li${_scopeId}><h1 class="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_PrismicLink, { field: latestArticle }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(_ctx.$prismic.asText(latestArticle.data.title))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$prismic.asText(latestArticle.data.title)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h1><p class="font-serif italic tracking-tighter text-slate-500"${_scopeId}>${ssrInterpolate(formatDate(latestArticle))}</p></li>`);
              });
              _push2(`<!--]--></ul></div></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 justify-items-center gap-16 md:gap-24" }, [
                  createVNode(_component_HorizontalDivider),
                  createVNode("div", { class: "w-full" }, [
                    createVNode(_component_Heading, {
                      size: "2xl",
                      class: "mb-10"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Latest articles ")
                      ]),
                      _: 1
                    }),
                    createVNode("ul", { class: "grid grid-cols-1 gap-12" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(latestArticles), (latestArticle) => {
                        return openBlock(), createBlock("li", {
                          key: latestArticle.id
                        }, [
                          createVNode("h1", { class: "mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl" }, [
                            createVNode(_component_PrismicLink, { field: latestArticle }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$prismic.asText(latestArticle.data.title)), 1)
                              ]),
                              _: 2
                            }, 1032, ["field"])
                          ]),
                          createVNode("p", { class: "font-serif italic tracking-tighter text-slate-500" }, toDisplayString(formatDate(latestArticle)), 1)
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/articles/[uid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_uid_-CddUfRlq.mjs.map
