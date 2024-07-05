import { mergeProps, useSSRContext } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { ssrRenderAttrs } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<hr${ssrRenderAttrs(mergeProps({ class: "h-px w-1/2 border-0 bg-slate-200 md:max-w-sm" }, _attrs))}>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HorizontalDivider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=HorizontalDivider-B6YJmzjp.mjs.map
