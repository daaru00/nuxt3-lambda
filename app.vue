<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const config = useAppConfig()

useHead({
  title: config.title,
  meta: [],
  bodyAttrs: {},
  script: []
})
</script>
