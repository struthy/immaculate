import { defineAsyncComponent } from "vue";
import { i as defineSliceZoneComponents } from "../server.mjs";
const components = defineSliceZoneComponents({
  contact_form: defineAsyncComponent(() => import("./index-0pLxJ1t8.js")),
  image: defineAsyncComponent(() => import("./index-Cwdhyu9_.js")),
  image_text_block: defineAsyncComponent(
    () => import("./index-G2ZiCXd7.js")
  ),
  quote: defineAsyncComponent(() => import("./index-U_u7cFsT.js")),
  text: defineAsyncComponent(() => import("./index-D6WE94gu.js"))
});
export {
  components as c
};
//# sourceMappingURL=index-akQ3gW3N.js.map
