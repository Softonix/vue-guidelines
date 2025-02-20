const Components = {
  TestModal: () => defineAsyncComponent(() => import('@/components/TestModal.vue'))
}

type TComponentsType = typeof Components

type TComponentsKeys = keyof TComponentsType

type TInferProps<T> = T extends new (...args: any[]) => infer R ? R extends { $props: infer P } ? P : never : never

type TComponentProps = {
  [K in TComponentsKeys]: TInferProps<ReturnType<TComponentsType[K]>>
}

const modals = ref(new Map<TComponentsKeys, { component: any; props?: any; isOpen: boolean }>())

export function useModals () {
  const openModal = <K extends TComponentsKeys>(name: K, props?: TComponentProps[K]) => {
    modals.value.set(name, { component: markRaw(Components[name]()), props, isOpen: true })
  }

  const closeModal = (name: TComponentsKeys) => {
    const modal = modals.value.get(name)
    if (modal) {
      modal.isOpen = false
    }
  }

  const isOpen = computed(() => [...modals.value.entries()].reduce((acc, [name, { isOpen }]) => {
    acc[name] = isOpen
    return acc
  }, {} as Record<TComponentsKeys, boolean>))

  return {
    modals,
    isOpen,
    openModal,
    closeModal
  }
}
