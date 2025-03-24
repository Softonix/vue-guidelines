const CACHE_NAME = 'app-cache-v1'
const MAX_CACHE_SIZE = 20

export default function useCacheAPI () {
  /**
   * Відкриває кеш
   */
  async function openCache (): Promise<Cache> {
    return await caches.open(CACHE_NAME)
  }

  /**
   * Отримує запис за ID
   */
  async function get<T> (id: string): Promise<T | null> {
    try {
      const cache = await openCache()
      const response = await cache.match(id)
      if (!response) return null
      return await response.json()
    } catch (error) {
      console.error('Failed to get entry from Cache:', error)
      return null
    }
  }

  /**
   * Зберігає запис
   */
  async function set<T> (id: string, data: T): Promise<void> {
    try {
      const cache = await openCache()
      
      // Перевіряємо розмір кешу
      const keys = await cache.keys()
      if (keys.length >= MAX_CACHE_SIZE) {
        // Видаляємо найстаріший запис
        await cache.delete(keys[0])
      }

      await cache.put(id, new Response(JSON.stringify(data)))
    } catch (error) {
      console.error('Failed to save entry to Cache:', error)
      throw error
    }
  }

  /**
   * Отримує всі записи
   */
  async function getAll<T> (): Promise<T[]> {
    try {
      const cache = await openCache()
      const keys = await cache.keys()
      const responses = await Promise.all(keys.map(key => cache.match(key)))
      return await Promise.all(responses.map(response => response?.json()))
    } catch (error) {
      console.error('Failed to get entries from Cache:', error)
      return []
    }
  }

  /**
   * Очищає всі записи
   */
  async function clear (): Promise<void> {
    try {
      const cache = await openCache()
      const keys = await cache.keys()
      await Promise.all(keys.map(key => cache.delete(key)))
    } catch (error) {
      console.error('Failed to clear Cache:', error)
      throw error
    }
  }

  /**
   * Кешує зображення
   */
  async function cacheImage (url: string, id: string): Promise<Blob> {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch image')
    const blob = await response.blob()

    const cache = await openCache()

    // Перевіряємо розмір кешу
    const keys = await cache.keys()
    if (keys.length >= MAX_CACHE_SIZE) {
      // Видаляємо найстаріший запис
      await cache.delete(keys[0])
    }

    // Зберігаємо новий запис
    await cache.put(id, new Response(blob))

    return blob
  }

  /**
   * Отримує зображення з кешу
   */
  async function getImageFromDB (url: string, id: string): Promise<string> {
    // For NUXT SSR
    // if (import.meta.server) return url

    const cache = await openCache()

    // Шукаємо в кеші
    const cachedResponse = await cache.match(id)
    if (cachedResponse) {
      const blob = await cachedResponse.blob()
      return URL.createObjectURL(blob)
    }

    // Якщо немає в кеші, завантажуємо та кешуємо
    return URL.createObjectURL(await cacheImage(url, id))
  }

  return {
    get,
    set,
    getAll,
    clear,
    getImageFromDB
  }
}
