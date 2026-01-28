<script lang="ts" setup generic="T">
defineProps<{
  data: T
}>()
</script>

<template>
  <slot v-bind="$props" />
</template>
