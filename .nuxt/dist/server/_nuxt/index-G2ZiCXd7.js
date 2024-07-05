import { _ as _sfc_main$1 } from "./Bounded-CqZsWWMI.js";
import { j as getSliceComponentProps, f as PrismicImage, g as PrismicRichText } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "klona";
import "ufo";
import "devalue";
import "cookie-es";
import "destr";
import "ohash";
import "@prismicio/client";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: getSliceComponentProps(),
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bounded = _sfc_main$1;
      const _component_PrismicImage = PrismicImage;
      const _component_PrismicRichText = PrismicRichText;
      _push(ssrRenderComponent(_component_Bounded, mergeProps({ as: "section" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<figure class="grid grid-cols-12 gap-4"${_scopeId}>`);
            if (_ctx.slice.primary.image.url) {
              _push2(`<div class="bg-gray-100 col-span-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_PrismicImage, {
                field: _ctx.slice.primary.image,
                width: _ctx.slice.primary.image.dimensions.width,
                height: _ctx.slice.primary.image.dimensions.height
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-span-8"${_scopeId}>`);
            if (_ctx.$prismic.asText(_ctx.slice.primary.text)) {
              _push2(ssrRenderComponent(_component_PrismicRichText, {
                field: _ctx.slice.primary.text,
                wrapper: "figcaption",
                class: "text-left text-base"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></figure>`);
          } else {
            return [
              createVNode("figure", { class: "grid grid-cols-12 gap-4" }, [
                _ctx.slice.primary.image.url ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-gray-100 col-span-4"
                }, [
                  createVNode(_component_PrismicImage, {
                    field: _ctx.slice.primary.image,
                    width: _ctx.slice.primary.image.dimensions.width,
                    height: _ctx.slice.primary.image.dimensions.height
                  }, null, 8, ["field", "width", "height"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "col-span-8" }, [
                  _ctx.$prismic.asText(_ctx.slice.primary.text) ? (openBlock(), createBlock(_component_PrismicRichText, {
                    key: 0,
                    field: _ctx.slice.primary.text,
                    wrapper: "figcaption",
                    class: "text-left text-base"
                  }, null, 8, ["field"])) : createCommentVNode("", true)
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("slices/ImageTextBlock/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-G2ZiCXd7.js.map
