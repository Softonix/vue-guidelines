<template>
  <div class="p-5">
    <StxIconCar />
    <el-button @click="openModal('TestModal')">
      Open Modal
    </el-button>
    <p class="text-primary">
      {{ testVar }}
    </p>
    <p class="text-primary">
      {{ books }}
    </p>
  </div>
</template>

<script lang="ts" setup>
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
