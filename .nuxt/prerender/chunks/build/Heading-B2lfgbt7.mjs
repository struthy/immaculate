import { defineComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, useSSRContext } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { ssrRenderVNode, ssrRenderSlot } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Heading",
  __ssrInlineRender: true,
  props: {
    as: {
      type: [String, Object],
      default: "h1"
    },
    size: {
      type: String,
      default: "4xl"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as), mergeProps({
        class: ["font-sans font-semibold tracking-tighter text-slate-800", {
          "text-3xl md:text-4xl": __props.size === "4xl",
          "text-3xl": __props.size === "3xl",
          "text-2xl": __props.size === "2xl",
          "text-xl": __props.size === "xl"
        }]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Heading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Heading-B2lfgbt7.mjs.map
