export const useHomeStore = defineStore('homeStore', () => {
  const testVar = ref('Hello')

  return {
    testVar
  }
})
