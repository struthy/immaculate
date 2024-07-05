import { defineComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, useSSRContext } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/index.mjs';
import { ssrRenderVNode, ssrRenderClass, ssrRenderSlot } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Bounded",
  __ssrInlineRender: true,
  props: {
    as: {
      type: [String, Object],
      default: "div"
    },
    size: {
      type: String,
      default: "base"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.as), mergeProps({ class: "px-4 py-8 md:py-10 md:px-6 lg:py-12" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{
              "max-w-xl": __props.size === "small",
              "max-w-3xl": __props.size === "base",
              "max-w-4xl": __props.size === "wide",
              "max-w-6xl": __props.size === "widest"
            }, "mx-auto w-full"])}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: ["mx-auto w-full", {
                  "max-w-xl": __props.size === "small",
                  "max-w-3xl": __props.size === "base",
                  "max-w-4xl": __props.size === "wide",
                  "max-w-6xl": __props.size === "widest"
                }]
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Bounded.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Bounded-CqZsWWMI.mjs.map
