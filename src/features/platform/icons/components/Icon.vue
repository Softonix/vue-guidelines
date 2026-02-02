<script setup lang="ts">
import { type Component } from 'vue'

const icons = import.meta.glob<Component>(
  '@/features/platform/icons/assets/*.svg',
  { import: 'default' }
)

const props = defineProps<{
  name: TIcons
}>()

console.log(icons)

const icon = shallowRef<Component | null>(null)

watch(() => props.name, async (name) => {
  const loader = icons[`/src/features/platform/icons/assets/${name}.svg`]
  icon.value = loader ? await loader() : null
}, { immediate: true })
</script>

<template>
  <component
    v-bind="$attrs"
    :is="icon"
    v-if="icon"
    height="1.25em"
    width="1.25em"
  />
</template>
