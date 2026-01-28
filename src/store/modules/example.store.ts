export const useExampleStore = defineStore('exampleStore', () => {
  const testVar = ref('Hello')

  return {
    testVar
  }
})
