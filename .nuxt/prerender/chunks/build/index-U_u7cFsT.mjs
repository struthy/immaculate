import { _ as _sfc_main$1 } from './Bounded-CqZsWWMI.mjs';
import { j as getSliceComponentProps } from './server.mjs';
import { defineComponent, mergeProps, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, Fragment, createCommentVNode, useSSRContext } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/server-renderer/index.mjs';
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
              _push2(`<div class="font-serif text-3xl italic leading-relaxed"${_scopeId}> \u201C ${ssrInterpolate(_ctx.$prismic.asText(_ctx.slice.primary.quote))} \u201D `);
              if (_ctx.slice.primary.source) {
                _push2(`<!--[--> \u2014 ${ssrInterpolate(_ctx.slice.primary.source)}<!--]-->`);
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
                createTextVNode(" \u201C " + toDisplayString(_ctx.$prismic.asText(_ctx.slice.primary.quote)) + " \u201D ", 1),
                _ctx.slice.primary.source ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createTextVNode(" \u2014 " + toDisplayString(_ctx.slice.primary.source), 1)
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

export { _sfc_main as default };
//# sourceMappingURL=index-U_u7cFsT.mjs.map
