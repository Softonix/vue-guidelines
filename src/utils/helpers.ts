// Tiny Observer pattern implementation as EventEmitter is EventTarget
// Define event payloads here. Each key is an event name, value is the payload type.
interface IEventMap {
  exampleEventName: string
}

class EventEmitter extends EventTarget {
  listen<K extends keyof IEventMap> (
    eventName: K,
    callback: (data: IEventMap[K]) => void,
    options?: AddEventListenerOptions
  ) {
    const handler = (event: CustomEvent<IEventMap[K]>) => callback(event.detail)
    this.addEventListener(eventName, handler as EventListener, options)

    return {
      remove: () => this.removeEventListener(eventName, handler as EventListener)
    }
  }

  publish<K extends keyof IEventMap> (eventName: K, data: IEventMap[K]): void {
    this.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }
}

export const helpers = {
  eventEmitter: new EventEmitter()
}
