<script lang="ts" setup>
const iconName = ref<TIcons>('car')
function toggleIcon () {
  iconName.value = iconName.value === 'car' ? 'cart' : 'car'
}

const homeStore = useHomeStore()
const { testVar } = storeToRefs(homeStore)

const { openModal } = useModals()

/* THIS IS FOR EXAMPLE PURPOSES. REMOVE ON REAL PROJECT */
const books = ref<TBooks>([])
async function init () {
  books.value = (await homeService.getBooks()).slice(0, 3)
}

onMounted(init)
</script>

<template>
  <div class="p-5 space-y-5">
    <Icon :name="iconName" class="size-10 text-primary" />

    <el-button @click="toggleIcon">Toggle Icon</el-button>

    <HomeComponent />
    <HomeNestedComponent />

    <el-button @click="openModal('HomeModal', { title: 'Home Modal' })">Open Modal</el-button>

    <p class="text-primary">{{ testVar }}</p>

    <p class="text-primary">{{ books }}</p>
  </div>
</template>
