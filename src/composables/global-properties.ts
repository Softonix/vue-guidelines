import { type ComponentCustomProperties, getCurrentInstance } from 'vue'

export function useGlobalProperties () {
  return getCurrentInstance()?.appContext.config.globalProperties as ComponentCustomProperties
}
