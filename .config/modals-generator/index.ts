import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

interface IModalEntry {
  name: string
  importPath: string
}

const SCAN_DIRS = ['src/views', 'src/features', 'src/components']
const OUTPUT = 'src/features/platform/modals/modals-registry.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '../..')

function findModalFiles (dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return findModalFiles(fullPath)
    }

    if (entry.isFile() && entry.name.endsWith('Modal.vue')) {
      return [fullPath]
    }

    return []
  })
}

function collectModals () {
  const outputDir = path.dirname(path.resolve(PROJECT_ROOT, OUTPUT))
  const modals: IModalEntry[] = []

  for (const scanDir of SCAN_DIRS) {
    const fullDir = path.resolve(PROJECT_ROOT, scanDir)
    const files = findModalFiles(fullDir)

    for (const file of files) {
      modals.push({
        name: path.basename(file, '.vue'),
        importPath:
          './' +
          path.relative(outputDir, file).replace(/\\/g, '/')
      })
    }
  }

  return modals.sort((a, b) => a.name.localeCompare(b.name))
}

function generateRegistrySource (modals: IModalEntry[]): string {
  return `/* Auto-generated modals registry - do not edit manually */
export const Modals = {
${modals
  .map(m => `  ${m.name}: () => defineAsyncComponent(() => import('${m.importPath}'))`)
  .join(',\n')}
}
`
}

function writeRegistryFile (content: string): void {
  const outputPath = path.resolve(PROJECT_ROOT, OUTPUT)
  const outputDir = path.dirname(outputPath)

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(outputPath, content, 'utf-8')
}

function generateModalsRegistry (): void {
  const modals = collectModals()
  const source = generateRegistrySource(modals)
  writeRegistryFile(source)
}

export const ModalsGenerator = (): Plugin => ({
  name: 'vite-plugin-modals-generator',
  buildStart: generateModalsRegistry,
  configureServer: (server) => {
    for (const dir of SCAN_DIRS) {
      server.watcher.add(path.resolve(PROJECT_ROOT, dir))
    }

    server.watcher.on('all', (_, filePath) => {
      if (filePath.endsWith('Modal.vue')) {
        generateModalsRegistry()
      }
    })
  }
})
