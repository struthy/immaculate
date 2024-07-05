import { _ as _sfc_main$1 } from './Bounded-CqZsWWMI.mjs';
import { j as getSliceComponentProps, f as PrismicImage, g as PrismicRichText } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/server-renderer/index.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  props: getSliceComponentProps(),
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bounded = _sfc_main$1;
      const _component_PrismicImage = PrismicImage;
      const _component_PrismicRichText = PrismicRichText;
      _push(ssrRenderComponent(_component_Bounded, mergeProps({
        as: "section",
        size: _ctx.slice.variation === "wide" ? "widest" : "base"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<figure class="grid grid-cols-1 gap-4"${_scopeId}>`);
            if (_ctx.slice.primary.image.url) {
              _push2(`<div class="bg-gray-100"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_PrismicImage, {
                field: _ctx.slice.primary.image,
                width: _ctx.slice.primary.image.dimensions.width,
                height: _ctx.slice.primary.image.dimensions.height
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$prismic.asText(_ctx.slice.primary.caption)) {
              _push2(ssrRenderComponent(_component_PrismicRichText, {
                field: _ctx.slice.primary.caption,
                wrapper: "figcaption",
                class: "text-center font-serif italic tracking-tight text-slate-500"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</figure>`);
          } else {
            return [
              createVNode("figure", { class: "grid grid-cols-1 gap-4" }, [
                _ctx.slice.primary.image.url ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-gray-100"
                }, [
                  createVNode(_component_PrismicImage, {
                    field: _ctx.slice.primary.image,
                    width: _ctx.slice.primary.image.dimensions.width,
                    height: _ctx.slice.primary.image.dimensions.height
                  }, null, 8, ["field", "width", "height"])
                ])) : createCommentVNode("", true),
                _ctx.$prismic.asText(_ctx.slice.primary.caption) ? (openBlock(), createBlock(_component_PrismicRichText, {
                  key: 1,
                  field: _ctx.slice.primary.caption,
                  wrapper: "figcaption",
                  class: "text-center font-serif italic tracking-tight text-slate-500"
                }, null, 8, ["field"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("slices/Image/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cwdhyu9_.mjs.map
