type TApiSignalCallback<T> = (signal: AbortSignal) => T

/**
 * useAbortController helps to abort API calls when a component is unmounted or when needed
 * @returns call - function to call an API with an abort signal
 * @returns abort - function to abort a single API call
 * @returns abortAll - function to abort all API calls
 */
export function useAbortController<TKeys extends PropertyKey> () {
  const abortControllers = new Map<TKeys, AbortController>()

  function call<TReturned> (key: TKeys, callback: TApiSignalCallback<TReturned>) {
    abort(key)
    const controller = new AbortController()
    abortControllers.set(key, controller)

    return callback(controller.signal)
  }

  function abort (key: TKeys) {
    abortControllers.get(key)?.abort()
  }

  function abortAll () {
    abortControllers.forEach(controller => controller.abort())
  }

  onUnmounted(abortAll)

  return {
    call,
    abort,
    abortAll
  }
}
