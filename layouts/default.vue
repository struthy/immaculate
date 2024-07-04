<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="text-slate-700">
   
    <Header
      :with-profile="route.meta.withHeaderProfile"
      :with-divider="route.meta.withHeaderDivider"
    />
    <slot />
    <Footer :with-sign-up-form="route.meta.withFooterSignUpForm" />
  </div>
</template>
