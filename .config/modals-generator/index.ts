import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const SCAN_DIRS = ['src/views', 'src/features', 'src/components']
const OUTPUT = 'src/features/modals/modals-registry.ts'

const findModalsRecursively = (dir: string, pattern: RegExp): string[] => {
  const results: string[] = []

  if (!fs.existsSync(dir)) return results

  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      results.push(...findModalsRecursively(fullPath, pattern))
    } else if (item.isFile() && pattern.test(item.name)) {
      results.push(fullPath)
    }
  }

  return results
}

export const ModalsGenerator = (): Plugin => {
  const generateModals = () => {
    const cwd = process.cwd()
    const outputPath = path.resolve(cwd, OUTPUT)
    const pattern = /Modal\.vue$/

    const allModals: { name: string; importPath: string }[] = []

    for (const scanDir of SCAN_DIRS) {
      const fullScanDir = path.resolve(cwd, scanDir)
      const modalFiles = findModalsRecursively(fullScanDir, pattern)

      for (const filePath of modalFiles) {
        const name = path.basename(filePath, '.vue')
        const relativePath = path.relative(path.join(cwd, 'src'), filePath).replace(/\\/g, '/')
        const importPath = `@/${relativePath}`

        allModals.push({ name, importPath })
      }
    }

    // Sort alphabetically for consistent output
    allModals.sort((a, b) => a.name.localeCompare(b.name))

    const content = `/* Auto-generated modals registry - do not edit manually */
export const Modals = {
${allModals.map(m => `  ${m.name}: () => defineAsyncComponent(() => import('${m.importPath}'))`).join(',\n')}
}
`

    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, content, 'utf-8')
    console.log(`[ModalsGenerator] Generated ${outputPath} with ${allModals.length} modals`)
  }

  return {
    name: 'vite-plugin-modals-generator',
    buildStart () {
      generateModals()
    },
    configureServer (server) {
      const cwd = process.cwd()

      for (const scanDir of SCAN_DIRS) {
        const fullScanDir = path.resolve(cwd, scanDir)
        server.watcher.add(fullScanDir)
      }

      server.watcher.on('all', (event, filePath) => {
        if (filePath.endsWith('Modal.vue')) {
          generateModals()
        }
      })
    }
  }
}

