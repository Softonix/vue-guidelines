import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export const IconsAutoImport = () => Icons({
  compiler: 'vue3',
  customCollections: {
    icon: FileSystemIconLoader('./src/assets/icons')
  }
})

export const IconsResolverCustom = () => IconsResolver({
  prefix: '',
  customCollections: ['icon']
})
