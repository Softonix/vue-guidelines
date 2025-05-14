<template>
  <div class="p-5" :style="{ background: colors.orange[400] }">
    <el-button @click="openModal('TestModal')">Open Modal</el-button>
    {{ testVar }}
    {{ books }}
  </div>
</template>

<script lang="ts" setup>
import { colors } from '@colors'

const generalStore = useGeneralStore()
const { testVar } = storeToRefs(generalStore)

const { openModal } = useModals()

/* THIS IS FOR EXAMPLE PURPOSES. REMOVE ON REAL PROJECT */
const books = ref<TBooks>([])
async function init () {
  books.value = (await useApiClient.get('/api/v1/Books')).slice(0, 3)
}

// async function createBook () {
//   await useApiClient.post('/api/v1/Books', { description: '' })
// }

// async function updateBook () {
//   await useApiClient.put('/api/v1/Books/{id}', { pageCount: 1, description: '123' }, { dynamicKeys: { id: 123 } })
// }

onMounted(init)
</script>
