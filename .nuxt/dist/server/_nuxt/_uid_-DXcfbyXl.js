import { b as usePrismic, d as useRoute, e as useAsyncData, u as useHead, S as SliceZone } from "../server.mjs";
import { u as useSettings } from "./useSettings-CLIk7AWv.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { c as components } from "./index-akQ3gW3N.js";
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
      var _a;
      const _component_SliceZone = SliceZone;
      _push(ssrRenderComponent(_component_SliceZone, mergeProps({
        wrapper: "main",
        slices: ((_a = unref(page)) == null ? void 0 : _a.data.slices) ?? [],
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
export {
  _sfc_main as default
};
//# sourceMappingURL=_uid_-DXcfbyXl.js.map
