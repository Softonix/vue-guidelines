# Modals

Modals are auto-registered Vue components matching `*Modal.vue`. The registry at `src/features/platform/modals/modals-registry.ts` is generated automatically — do not edit it. The open/close state of every modal is owned by `useModals()`, not by the modal component itself.

## Opening a Modal

From any component, composable, or store, call `openModal(name, props)` from `useModals()`. Props are typed against the modal's `defineProps`.

## Inside a Modal Component

A modal component must get its visibility from `useModals()` — never define a local `open` ref. Destructure `isOpen` and `closeModal` and reference the modal by its registry name:

- Bind `<UModal :open="isOpen.ModalName" @update:open="closeModal('ModalName')">` — `isOpen` is a read-only computed, so `v-model:open` will NOT work
- Call `closeModal('ModalName')` from button handlers to dismiss

## Rules

- File name must end in `Modal.vue` and the component name must match its registry key — auto-registration relies on this
- Bind `:open="isOpen.ModalName"` + `@update:open="closeModal('ModalName')"` — never `v-model:open` (the computed has no setter), never a local `open` ref
- Call `closeModal('ModalName')` to dismiss — do NOT manually mutate `isOpen`
- Pass user actions in via props (`onConfirm`, `onCancel`, etc.) — modals do not import feature logic directly

## References

- `src/views/home/components/modals/HomeModal.vue` — reusable confirmation modal (open it via `openModal('AppConfirmModal', { ... })`)
