import { _ as _sfc_main$1 } from "./Bounded-CqZsWWMI.js";
import { j as getSliceComponentProps, g as PrismicRichText } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
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
      const _component_PrismicRichText = PrismicRichText;
      _push(ssrRenderComponent(_component_Bounded, mergeProps({ as: "section" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$prismic.asText(_ctx.slice.primary.text)) {
              _push2(ssrRenderComponent(_component_PrismicRichText, {
                class: "font-serif leading-relaxed md:text-xl md:leading-relaxed",
                field: _ctx.slice.primary.text,
                wrapper: "div"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.$prismic.asText(_ctx.slice.primary.text) ? (openBlock(), createBlock(_component_PrismicRichText, {
                key: 0,
                class: "font-serif leading-relaxed md:text-xl md:leading-relaxed",
                field: _ctx.slice.primary.text,
                wrapper: "div"
              }, null, 8, ["field"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("slices/Text/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-D6WE94gu.js.map
