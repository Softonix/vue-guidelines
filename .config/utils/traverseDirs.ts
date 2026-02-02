import { readdirSync, type Dirent } from 'fs'
import { join } from 'path'

interface ITraverseOptions {
  withFiles?: boolean
}

export function traverseDirs (
  rootDir: string,
  options: ITraverseOptions = { withFiles: false }
) {
  const result: { fullPath: string; entry: Dirent }[] = []

  function walk (currentDir: string): void {
    const entries = readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)

      if (entry.isDirectory()) {
        result.push({ fullPath, entry })
        walk(fullPath)
      } else if (options.withFiles && entry.isFile()) {
        result.push({ fullPath, entry })
      }
    }
  }

  walk(rootDir)
  return result
}
