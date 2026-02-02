import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const INPUT = 'src/features/platform/icons/assets'
const OUTPUT = 'src/features/platform/icons/icons.d.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '../..')

function readIconFiles (dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.svg'))
    .map(entry => entry.name)
}

function collectIconNames (): string[] {
  const iconsDir = path.resolve(PROJECT_ROOT, INPUT)

  if (!fs.existsSync(iconsDir)) {
    console.warn(`[IconNamesGenerator] Icons directory not found: ${iconsDir}`)
    return []
  }

  return readIconFiles(iconsDir)
    .map(file => path.basename(file, '.svg'))
    .sort()
}

function generateTypesSource (iconNames: string[]): string {
  return `/* Auto-generated icons names - do not edit manually */
type TIcons = ${
  iconNames.length
    ? iconNames.map(name => `'${name}'`).join(' | ')
    : 'never'
}
`
}

function writeTypesFile (content: string): void {
  const outputPath = path.resolve(PROJECT_ROOT, OUTPUT)
  const outputDir = path.dirname(outputPath)

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(outputPath, content, 'utf-8')
}

function generateIconNames (): void {
  const icons = collectIconNames()
  const source = generateTypesSource(icons)
  writeTypesFile(source)
}

export const IconNamesGenerator = (): Plugin => ({
  name: 'vite-plugin-icons-names-generator',
  buildStart: generateIconNames,
  configureServer: (server) => {
    const iconsDir = path.resolve(PROJECT_ROOT, INPUT)

    server.watcher.add(iconsDir)
    server.watcher.on('all', (_, filePath) => {
      if (filePath.endsWith('.svg') && filePath.startsWith(iconsDir)) {
        generateIconNames()
      }
    })
  }
})
