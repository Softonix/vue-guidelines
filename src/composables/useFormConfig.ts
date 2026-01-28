
// --------------------------------------------- F O R M  R E F --------------------------------------------------------
export function useElFormRef (initialValue: any = null) {
  return ref<IElementPlus['FormInstance']>(initialValue)
}

// --------------------------------------------- F O R M  M O D E L ----------------------------------------------------
export function useElFormModel<T extends object> (model: T) {
  return reactive<T>(model)
}

// ------------------------------------------- F O R M  R U L E S ------------------------------------------------------
export function useElFormRules (model: IElementPlus['FormRules']) {
  return ref(model)
}

export function useRequiredRule ({ required = true } = {}): IElementPlus['FormItemRule'] {
  return { required, message: 'Required field', trigger: 'change' }
}

export function useEmailRule (): IElementPlus['FormItemRule'] {
  return { type: 'email', message: 'Invalid email', trigger: ['change', 'blur'] }
}

export function useMinLenRule (min: number): IElementPlus['FormItemRule'] {
  return { min, message: `Minimum ${min} characters`, trigger: 'change' }
}

export function useMaxLenRule (max: number): IElementPlus['FormItemRule'] {
  return { max, message: `Maximum ${max} characters`, trigger: 'change' }
}
