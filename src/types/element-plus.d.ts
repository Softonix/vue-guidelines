type TElementPlus = typeof import('element-plus')
interface IElementPlus {
  UploadInstance: import('element-plus').UploadInstance
  UploadProps: import('element-plus').UploadProps
  UploadUserFile: import('element-plus').UploadUserFile

  ElInput: import('element-plus').ElInput
  ElInputNumber: import('element-plus').ElInputNumber
  ElButton: import('element-plus').ElButton

  FormInstance: import('element-plus').FormInstance
  FormItemRule: import('element-plus').FormItemRule
  FormRules: import('element-plus').FormRules

  ElMessageBoxOptions: import('element-plus').ElMessageBoxOptions
  MessageOptions: import('element-plus').MessageOptions
  NotificationOptions: import('element-plus').NotificationOptions
  LoadingOptions: import('element-plus').LoadingOptions
  Column: import('element-plus').Column

  LoadingInstance: import('element-plus/es/components/loading/src/loading').LoadingInstance
  TranslatePair: import('element-plus/es/locale').TranslatePair
}

type TElEpPropMergeType<Type, Value, Validator> = import('element-plus/es/utils/index.mjs').EpPropMergeType<Type, Value, Validator>
