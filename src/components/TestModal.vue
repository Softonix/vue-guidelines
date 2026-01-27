<template>
  <el-dialog
    :model-value="isOpen.TestModal"
    :before-close="() => closeModal('TestModal')"
    class="no-header body-p-0 max-w-[700px]"
    destroy-on-close
  >
    <div>Test Modal Content</div>

    <template #footer>
      <el-button type="primary" class="w-[100px]" @click="closeModal('TestModal')">
        Cancel
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const { isOpen, closeModal } = useModals()
</script>
