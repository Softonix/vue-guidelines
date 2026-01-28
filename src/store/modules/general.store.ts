export const useGeneralStore = defineStore('generalStore', () => {
  const testVar = ref('Hello')

  return {
    testVar
  }
})
