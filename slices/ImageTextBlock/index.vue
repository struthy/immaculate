<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ImageTextBlockSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <Bounded
    as="section"
  >
    <figure class="grid grid-cols-12 gap-4">
      <div
        v-if="slice.primary.image.url"
        class="bg-gray-100 col-span-4"
      >
        <PrismicImage
          :field="slice.primary.image"
          :width="slice.primary.image.dimensions.width"
          :height="slice.primary.image.dimensions.height"
        />
      </div>
      <div class="col-span-8">
        <PrismicRichText
          v-if="$prismic.asText(slice.primary.text)"
          :field="slice.primary.text"
          wrapper="figcaption"
          class="text-left text-base"
        />
    </div>
    </figure>
  </Bounded>
</template>
