import { _ as _sfc_main$4 } from "./Bounded-CqZsWWMI.js";
import { defineComponent, useSSRContext, mergeProps, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { j as getSliceComponentProps } from "../server.mjs";
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
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Field",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(_attrs)}><span class="text-sm text-slate-500">${ssrInterpolate(__props.label)}</span>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</label>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Field.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InputField",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Field = _sfc_main$3;
      _push(ssrRenderComponent(_component_Field, mergeProps({ label: __props.label }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("name", __props.name)}${ssrRenderAttr("type", __props.type)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderAttr("placeholder", __props.placeholder)} class="w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"${_scopeId}>`);
          } else {
            return [
              createVNode("input", {
                name: __props.name,
                type: __props.type,
                required: __props.required,
                placeholder: __props.placeholder,
                class: "w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"
              }, null, 8, ["name", "type", "required", "placeholder"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InputField.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TextareaField",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Field = _sfc_main$3;
      _push(ssrRenderComponent(_component_Field, mergeProps({ label: __props.label }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<textarea${ssrRenderAttr("name", __props.name)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrRenderAttr("placeholder", __props.placeholder)} class="h-40 w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"${_scopeId}></textarea>`);
          } else {
            return [
              createVNode("textarea", {
                name: __props.name,
                required: __props.required,
                placeholder: __props.placeholder,
                class: "h-40 w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"
              }, null, 8, ["name", "required", "placeholder"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TextareaField.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: getSliceComponentProps(),
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Bounded = _sfc_main$4;
      const _component_InputField = _sfc_main$2;
      const _component_TextareaField = _sfc_main$1;
      _push(ssrRenderComponent(_component_Bounded, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form action="/api/contact" method="post" class="grid grid-cols-1 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_InputField, {
              label: "Name",
              name: "name",
              placeholder: "Jane Doe"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_InputField, {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "jane.doe@example.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_TextareaField, {
              label: "Message",
              name: "message",
              placeholder: "Write your message here…"
            }, null, _parent2, _scopeId));
            _push2(`<button type="submit" class="ml-auto inline-flex items-center gap-2"${_scopeId}> Send message <span aria-hidden="true" class="text-xl"${_scopeId}> → </span></button></form>`);
          } else {
            return [
              createVNode("form", {
                action: "/api/contact",
                method: "post",
                class: "grid grid-cols-1 gap-6"
              }, [
                createVNode(_component_InputField, {
                  label: "Name",
                  name: "name",
                  placeholder: "Jane Doe"
                }),
                createVNode(_component_InputField, {
                  label: "Email Address",
                  name: "email",
                  type: "email",
                  placeholder: "jane.doe@example.com"
                }),
                createVNode(_component_TextareaField, {
                  label: "Message",
                  name: "message",
                  placeholder: "Write your message here…"
                }),
                createVNode("button", {
                  type: "submit",
                  class: "ml-auto inline-flex items-center gap-2"
                }, [
                  createTextVNode(" Send message "),
                  createVNode("span", {
                    "aria-hidden": "true",
                    class: "text-xl"
                  }, " → ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("slices/ContactForm/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-0pLxJ1t8.js.map
