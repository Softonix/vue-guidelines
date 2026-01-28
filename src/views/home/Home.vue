<template>
  <div class="p-5 space-y-5">
    <IconCar />
    <IconCart />

    <HomeComponent />
    <HomeNestedComponent />

    <el-button @click="openModal('HomeModal')">Open Modal</el-button>

    <p class="text-primary">{{ testVar }}</p>

    <p class="text-primary">{{ books }}</p>
  </div>
</template>

<script lang="ts" setup>
const exampleStore = useExampleStore()
const { testVar } = storeToRefs(exampleStore)

const { openModal } = useModals()

/* THIS IS FOR EXAMPLE PURPOSES. REMOVE ON REAL PROJECT */
const books = ref<TBooks>([])
async function init () {
  books.value = (await exampleService.getBooks()).slice(0, 3)
}

onMounted(init)
</script>
