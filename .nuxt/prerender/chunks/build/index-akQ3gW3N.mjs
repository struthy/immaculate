import { defineAsyncComponent } from 'file://C:/webdev/Tutorials/nuxt-blog/node_modules/vue/index.mjs';
import { i as defineSliceZoneComponents } from './server.mjs';

const components = defineSliceZoneComponents({
  contact_form: defineAsyncComponent(() => import('./index-0pLxJ1t8.mjs')),
  image: defineAsyncComponent(() => import('./index-Cwdhyu9_.mjs')),
  image_text_block: defineAsyncComponent(
    () => import('./index-G2ZiCXd7.mjs')
  ),
  quote: defineAsyncComponent(() => import('./index-U_u7cFsT.mjs')),
  text: defineAsyncComponent(() => import('./index-D6WE94gu.mjs'))
});

export { components as c };
//# sourceMappingURL=index-akQ3gW3N.mjs.map
