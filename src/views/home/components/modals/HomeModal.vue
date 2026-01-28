<script setup lang="ts">
defineProps<{
  title: string
}>()

const { isOpen, closeModal } = useModals()
</script>

<template>
  <el-dialog
    :model-value="isOpen.HomeModal"
    :before-close="() => closeModal('HomeModal')"
    destroy-on-close
    :title="title"
  >
    <div>Test Modal Content</div>

    <template #footer>
      <el-button type="primary" class="w-[100px]" @click="closeModal('HomeModal')">
        Cancel
      </el-button>
    </template>
  </el-dialog>
</template>
