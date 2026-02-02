import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const SCAN_DIRS = ['src/views', 'src/router']
const OUTPUT = 'src/router/route-names-registry.ts'
const ROUTE_NAMES_PATTERN = /routeNames\.(\w+)/g

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '../..')

function findRouteFiles (dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return findRouteFiles(fullPath)
    }

    if (entry.isFile() && entry.name.endsWith('.routes.ts')) {
      return [fullPath]
    }

    return []
  })
}

function collectRouteFiles (): string[] {
  const files: string[] = []

  for (const scanDir of SCAN_DIRS) {
    const fullDir = path.resolve(PROJECT_ROOT, scanDir)
    files.push(...findRouteFiles(fullDir))

    // Explicit routes.ts in router root
    const rootRoutes = path.join(fullDir, 'routes.ts')
    if (fs.existsSync(rootRoutes)) {
      files.push(rootRoutes)
    }
  }

  return Array.from(new Set(files))
}

function extractRouteNames (files: string[]): string[] {
  const names = new Set<string>()

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8')
    let match: RegExpExecArray | null

    while ((match = ROUTE_NAMES_PATTERN.exec(content)) !== null) {
      names.add(match[1])
    }
  }

  return Array.from(names).sort()
}

function generateRegistrySource (routeNames: string[]): string {
  return `/* Auto-generated route names registry - do not edit manually */
export const routeNames = {
${routeNames.map(name => `  ${name}: '${name}'`).join(',\n')}
}
`
}

function writeRegistryFile (content: string): void {
  const outputPath = path.resolve(PROJECT_ROOT, OUTPUT)
  const outputDir = path.dirname(outputPath)

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(outputPath, content, 'utf-8')
}

function generateRouteNamesRegistry (): void {
  const files = collectRouteFiles()
  const names = extractRouteNames(files)
  const source = generateRegistrySource(names)
  writeRegistryFile(source)
}

export const RouteNamesGenerator = (): Plugin => ({
  name: 'vite-plugin-route-names-generator',
  buildStart: generateRouteNamesRegistry,
  configureServer: (server) => {
    for (const dir of SCAN_DIRS) {
      server.watcher.add(path.resolve(PROJECT_ROOT, dir))
    }

    server.watcher.on('all', (_, filePath) => {
      if (filePath.endsWith('.routes.ts') || filePath.endsWith('routes.ts')) {
        generateRouteNamesRegistry()
      }
    })
  }
})
