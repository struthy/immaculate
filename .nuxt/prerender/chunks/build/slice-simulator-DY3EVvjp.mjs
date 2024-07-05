import { S as SliceZone } from './server.mjs';
import { defineComponent, unref, withCtx, createVNode, useSSRContext } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file:///home/runner/work/immaculate/immaculate/node_modules/vue/server-renderer/index.mjs';
import { SliceSimulator } from 'file:///home/runner/work/immaculate/immaculate/node_modules/@slicemachine/adapter-nuxt/dist/simulator.js';
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
  __name: "slice-simulator",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SliceZone = SliceZone;
      _push(ssrRenderComponent(unref(SliceSimulator), _attrs, {
        default: withCtx(({ slices }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SliceZone, {
              slices,
              components: unref(components)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SliceZone, {
                slices,
                components: unref(components)
              }, null, 8, ["slices", "components"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/slice-simulator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=slice-simulator-DY3EVvjp.mjs.map
