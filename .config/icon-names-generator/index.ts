import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

interface IOptions {
  input?: string
  output?: string
}

export const IconNamesGenerator = (options: IOptions = {}): Plugin => {
  const {
    input = 'src/assets/icons',
    output = 'dts/icons.d.ts'
  } = options

  const generateIconsNames = () => {
    const iconsDir = path.resolve(process.cwd(), input)
    const outputPath = path.resolve(process.cwd(), output)

    if (!fs.existsSync(iconsDir)) {
      console.warn(`[IconNamesGenerator] Icons directory not found: ${iconsDir}`)
      return
    }

    const files = fs.readdirSync(iconsDir)
    const iconNames = files
      .filter(file => file.endsWith('.svg'))
      .map(file => path.basename(file, '.svg'))

    const content = `/* Auto-generated icons names - do not edit manually */
type TIcons = ${iconNames.length ? iconNames.map(name => `'${name}'`).join(' | ') : 'never'}
`

    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, content, 'utf-8')
  }

  return {
    name: 'vite-plugin-icons-names-generator',
    buildStart () {
      generateIconsNames()
    },
    configureServer (server) {
      const iconsDir = path.resolve(process.cwd(), input)

      server.watcher.add(iconsDir)
      server.watcher.on('all', (event, filePath) => {
        if (filePath.startsWith(iconsDir) && filePath.endsWith('.svg')) {
          generateIconsNames()
        }
      })
    }
  }
}

