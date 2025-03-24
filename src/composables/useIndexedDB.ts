export default function useIndexedDBStorage () {
  const DB_NAME = 'imageCacheDB'
  const STORE_NAME = 'images'

  /**
   * Відкриває з'єднання з IndexedDB
   */
  function openDB (): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Виконує операцію з IndexedDB
   */
  async function executeTransaction<T> (
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, mode)
      const store = tx.objectStore(STORE_NAME)
      const request = operation(store)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)

      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(new Error('Transaction aborted'))
    })
  }

  /**
   * Отримує запис за ID
   */
  async function get (id: string): Promise<any | null> {
    try {
      return await executeTransaction<any | null>('readonly', (store) => store.get(id)
      )
    } catch (error) {
      console.error('Failed to get entry from IndexedDB:', error)
      return null
    }
  }

  /**
   * Зберігає запис
   */
  async function set (entry: any): Promise<void> {
    try {
      await executeTransaction<IDBValidKey>('readwrite', (store) => store.put(entry)
      )
    } catch (error) {
      console.error('Failed to save entry to IndexedDB:', error)
      throw error
    }
  }

  /**
   * Отримує всі записи
   */
  async function getAll (): Promise<any[]> {
    try {
      return await executeTransaction<any[]>('readonly', (store) => store.getAll()
      )
    } catch (error) {
      console.error('Failed to get entries from IndexedDB:', error)
      return []
    }
  }

  /**
   * Очищає всі записи
   */
  async function clear (): Promise<void> {
    try {
      await executeTransaction<undefined>('readwrite', (store) => store.clear())
    } catch (error) {
      console.error('Failed to clear IndexedDB:', error)
      throw error
    }
  }

  return {
    get,
    set,
    getAll,
    clear
  }
}
