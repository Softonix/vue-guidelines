export function parseDynamicKeys (url: string, dynamicKeys?: Record<string, string | number>): string {
  const regex = /\{([^}]+)\}/g

  const replacedUrl = url.replace(regex, (match: string, key: string) => {
    if (dynamicKeys?.[key]) {
      return dynamicKeys[key]?.toString() || match
    }
    return match
  })

  return replacedUrl
}
