import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const SCAN_DIRS = ['src/views', 'src/router']
const OUTPUT = 'src/router/route-names-registry.ts'
const ROUTE_NAMES_PATTERN = /routeNames\.(\w+)/g

const findRoutesFilesRecursively = (dir: string): string[] => {
  const results: string[] = []

  if (!fs.existsSync(dir)) return results

  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      results.push(...findRoutesFilesRecursively(fullPath))
    } else if (item.isFile() && item.name.endsWith('.routes.ts')) {
      results.push(fullPath)
    }
  }

  return results
}

export const RouteNamesGenerator = (): Plugin => {
  const generateRouteNames = () => {
    const cwd = process.cwd()
    const outputPath = path.resolve(cwd, OUTPUT)
    const routeNames = new Set<string>()

    for (const scanDir of SCAN_DIRS) {
      const fullScanDir = path.resolve(cwd, scanDir)
      const routeFiles = findRoutesFilesRecursively(fullScanDir)

      // Also check routes.ts directly in router folder
      const routerRoutesFile = path.resolve(fullScanDir, 'routes.ts')
      if (fs.existsSync(routerRoutesFile)) {
        routeFiles.push(routerRoutesFile)
      }

      for (const filePath of routeFiles) {
        const content = fs.readFileSync(filePath, 'utf-8')
        let match

        while ((match = ROUTE_NAMES_PATTERN.exec(content)) !== null) {
          routeNames.add(match[1])
        }
      }
    }

    const sortedNames = Array.from(routeNames).sort()

    const content = `/* Auto-generated route names registry - do not edit manually */
export const routeNames = {
${sortedNames.map(name => `  ${name}: '${name}'`).join(',\n')}
}
`

    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, content, 'utf-8')
  }

  return {
    name: 'vite-plugin-route-names-generator',
    buildStart () {
      generateRouteNames()
    },
    configureServer (server) {
      const cwd = process.cwd()

      for (const scanDir of SCAN_DIRS) {
        const fullScanDir = path.resolve(cwd, scanDir)
        server.watcher.add(fullScanDir)
      }

      server.watcher.on('all', (event, filePath) => {
        if (filePath.endsWith('.routes.ts') || filePath.endsWith('routes.ts')) {
          generateRouteNames()
        }
      })
    }
  }
}

