type TIndexedObject<T = any> = Record<string, T>

type TCallbackFn<T extends unknown[] = [], R = void> = (...args: T) => R

type TFormatterFunction<T> = (row: T) => (number | string)
type TTableHeadings<T = Record<string, any>> = Array<{
  label: string
  value: string
  sort?: boolean
  width?: number
  minWidth?: number
  fixed?: boolean | 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  showOverflowTooltip?: boolean
  sortMethod?: (a: number, b: number) => number
  formatter?: (row: T) => (number | string)
}>
