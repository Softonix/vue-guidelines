import { readdirSync } from 'fs'
import { join as pathJoin } from 'pathe'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { IconsResolverCustom } from './vite.config.icons'

/* CONFIGURATION FOR COMPONENTS AUTO-IMPORT */
export const ComponentsBuilder = () => Components({
  dts: './dts/components.d.ts',
  dirs: [
    './src/components',
    ...buildViewsComponents()
  ],
  resolvers: [
    ElementPlusResolver(),
    IconsResolverCustom()
  ]
})

function buildViewsComponents () {
  const componentsDirs: string[] = []
  function getComponentsDirs (dirName: string) {
    try {
      const dirs = readdirSync(dirName, { withFileTypes: true }).filter(dirent => dirent.isDirectory())
      dirs.forEach((dir) => {
        const dirPath = pathJoin(dirName, dir.name)
        if (dirPath.includes('/components')) {
          componentsDirs.push(dirPath)
        }
        getComponentsDirs((dirPath))
      })
    } catch {
      console.warn(`No such file or directory, ${dirName}`)
    }
  }
  getComponentsDirs('./src/views')
  return componentsDirs
}
