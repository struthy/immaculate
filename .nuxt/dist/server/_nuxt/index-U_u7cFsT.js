import { _ as _sfc_main$1 } from "./Bounded-CqZsWWMI.js";
import { j as getSliceComponentProps } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, Fragment, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
      _push(ssrRenderComponent(_component_Bounded, mergeProps({
        as: "section",
        size: "wide"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$prismic.asText(_ctx.slice.primary.quote)) {
              _push2(`<div class="font-serif text-3xl italic leading-relaxed"${_scopeId}> “ ${ssrInterpolate(_ctx.$prismic.asText(_ctx.slice.primary.quote))} ” `);
              if (_ctx.slice.primary.source) {
                _push2(`<!--[--> — ${ssrInterpolate(_ctx.slice.primary.source)}<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.$prismic.asText(_ctx.slice.primary.quote) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "font-serif text-3xl italic leading-relaxed"
              }, [
                createTextVNode(" “ " + toDisplayString(_ctx.$prismic.asText(_ctx.slice.primary.quote)) + " ” ", 1),
                _ctx.slice.primary.source ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createTextVNode(" — " + toDisplayString(_ctx.slice.primary.source), 1)
                ], 64)) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("slices/Quote/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-U_u7cFsT.js.map
