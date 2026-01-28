import { Modals } from '../modals-registry'

type TModalsType = typeof Modals

type TModalsKeys = keyof TModalsType

type TInferProps<T> = T extends new (...args: any[]) => infer R ? R extends { $props: infer P } ? P : never : never

type TComponentProps = {
  [K in TModalsKeys]: TInferProps<ReturnType<TModalsType[K]>>
}

const modals = ref(new Map<TModalsKeys, { component: any; props?: any; isOpen: boolean }>())

export function useModals () {
  const openModal = <K extends TModalsKeys>(name: K, props?: TComponentProps[K]) => {
    modals.value.set(name, { component: markRaw(Modals[name]()), props, isOpen: true })
  }

  const closeModal = (name: TModalsKeys) => {
    const modal = modals.value.get(name)
    if (modal) {
      modal.isOpen = false
    }
  }

  const isOpen = computed(() => [...modals.value.entries()].reduce((acc, [name, { isOpen }]) => {
    acc[name] = isOpen
    return acc
  }, {} as Record<TModalsKeys, boolean>))

  return {
    modals,
    isOpen,
    openModal,
    closeModal
  }
}

