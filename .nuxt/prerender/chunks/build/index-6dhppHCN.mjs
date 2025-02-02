import { _ as _sfc_main$2 } from './Bounded-CqZsWWMI.mjs';
import { b as usePrismic, e as useAsyncData, u as useHead, h as PrismicLink, f as PrismicImage } from './server.mjs';
import { _ as _sfc_main$3 } from './Heading-B2lfgbt7.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, createTextVNode, toDisplayString } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrInterpolate } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/server-renderer/index.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ArticleListItem",
  __ssrInlineRender: true,
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    const prismic = usePrismic();
    const featuredImage = computed(() => {
      if (props.article.data.featuredImage.url) {
        return props.article.data.featuredImage;
      }
      const imageSlice = props.article.data.slices.find((slice) => slice.slice_type === "image");
      if (imageSlice && imageSlice.primary.image.url) {
        return imageSlice.primary.image;
      }
      return null;
    });
    const formattedDate = computed(() => {
      const date = prismic.asDate(props.article.data.publishDate || props.article.first_publication_date);
      return dateFormatter.format(date || void 0);
    });
    const excerpt = computed(() => {
      const text = props.article.data.slices.filter((slice) => slice.slice_type === "text").map((slice) => prismic.asText(slice.primary.text)).join(" ");
      const excerpt2 = text.substring(0, 300);
      if (text.length > 300) {
        return excerpt2.substring(0, excerpt2.lastIndexOf(" ")) + "\u2026";
      } else {
        return excerpt2;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PrismicLink = PrismicLink;
      const _component_PrismicImage = PrismicImage;
      const _component_Heading = _sfc_main$3;
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_PrismicLink, {
        field: __props.article,
        "tab-index": "-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="aspect-w-4 aspect-h-3 relative bg-gray-100"${_scopeId}>`);
            if ((_a = unref(featuredImage)) == null ? void 0 : _a.url) {
              _push2(ssrRenderComponent(_component_PrismicImage, {
                field: unref(featuredImage),
                class: "object-cover"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "aspect-w-4 aspect-h-3 relative bg-gray-100" }, [
                ((_b = unref(featuredImage)) == null ? void 0 : _b.url) ? (openBlock(), createBlock(_component_PrismicImage, {
                  key: 0,
                  field: unref(featuredImage),
                  class: "object-cover"
                }, null, 8, ["field"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 gap-3 md:col-span-2">`);
      _push(ssrRenderComponent(_component_Heading, { as: "h2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PrismicLink, { field: __props.article }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$prismic.asText(__props.article.data.title))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$prismic.asText(__props.article.data.title)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PrismicLink, { field: __props.article }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$prismic.asText(__props.article.data.title)), 1)
                ]),
                _: 1
              }, 8, ["field"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="font-serif italic tracking-tighter text-slate-500">${ssrInterpolate(unref(formattedDate))}</p>`);
      if (unref(excerpt)) {
        _push(`<p class="font-serif leading-relaxed md:text-lg md:leading-relaxed">${ssrInterpolate(unref(excerpt))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></li>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ArticleListItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const prismic = usePrismic();
    const { data: articles } = useAsyncData(
      "$articles",
      () => prismic.client.getAllByType("article", {
        orderings: [
          { field: "my.article.publishDate", direction: "desc" },
          { field: "document.first_publication_date", direction: "desc" }
        ]
      })
    );
    const settings = useSettings();
    useHead({
      title: computed(() => {
        var _a;
        return prismic.asText((_a = settings.value) == null ? void 0 : _a.data.name);
      })
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bounded = _sfc_main$2;
      const _component_ArticleListItem = _sfc_main$1;
      _push(ssrRenderComponent(_component_Bounded, mergeProps({ size: "widest" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="grid grid-cols-1 gap-16"${_scopeId}><!--[-->`);
            ssrRenderList(unref(articles), (article) => {
              _push2(ssrRenderComponent(_component_ArticleListItem, {
                key: article.id,
                article
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "grid grid-cols-1 gap-16" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(articles), (article) => {
                  return openBlock(), createBlock(_component_ArticleListItem, {
                    key: article.id,
                    article
                  }, null, 8, ["article"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6dhppHCN.mjs.map
