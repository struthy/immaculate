import { b as usePrismic, d as useRoute, e as useAsyncData, u as useHead, S as SliceZone } from './server.mjs';
import { u as useSettings } from './useSettings-CLIk7AWv.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { ssrRenderComponent } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/server-renderer/index.mjs';
import { c as components } from './index-akQ3gW3N.mjs';
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
  __name: "[uid]",
  __ssrInlineRender: true,
  setup(__props) {
    const prismic = usePrismic();
    const route = useRoute();
    const { data: page } = useAsyncData(
      route.params.uid,
      () => prismic.client.getByUID("page", route.params.uid),
      "$yhB4qdtz2u"
    );
    const settings = useSettings();
    useHead({
      title: computed(() => {
        var _a, _b;
        return `${prismic.asText((_a = page.value) == null ? void 0 : _a.data.title)} | ${prismic.asText((_b = settings.value) == null ? void 0 : _b.data.name)}`;
      })
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a;
      const _component_SliceZone = SliceZone;
      _push(ssrRenderComponent(_component_SliceZone, mergeProps({
        wrapper: "main",
        slices: (_a2 = (_a = unref(page)) == null ? void 0 : _a.data.slices) != null ? _a2 : [],
        components: unref(components)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[uid].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_uid_-DXcfbyXl.mjs.map
