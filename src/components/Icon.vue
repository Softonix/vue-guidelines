<script setup lang="ts">
import { type Component } from 'vue'

const icons = import.meta.glob<Component>(
  '@/assets/icons/*.svg',
  { import: 'default' }
)

const props = defineProps<{
  name: TIcons
}>()

const icon = shallowRef<Component | null>(null)

watch(() => props.name, async (name) => {
  const loader = icons[`/src/assets/icons/${name}.svg`]
  icon.value = loader ? await loader() : null
}, { immediate: true })
</script>

<template>
  <component
    v-if="icon"
    :is="icon"
    v-bind="$attrs"
    height="1.25em"
    width="1.25em"
  />
</template>
