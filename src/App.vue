<template>
  <ElConfigProvider
    :locale="{
      name: locale,
      el: messages[locale]?.el as TElementPlus['TranslatePair']
    }"
  >
    <router-view />
    <Modals />

    <ElButton @click="openModal('TestModal')">Open modal</ElButton>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
const { messages, locale } = useI18n()
const { openModal } = useModals()
</script>
