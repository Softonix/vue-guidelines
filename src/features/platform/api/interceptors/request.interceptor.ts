import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { parseDynamicKeys } from '../helpers'

// TODO: the following code is just an example. Please write your own project specific interceptors

const requestInterceptor = (requestConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // if (requestConfig.headers) {
  //   requestConfig.headers.Authorization = `Bearer ${await authStore.getToken()}`
  // }

  if (requestConfig.url) {
    requestConfig.url = parseDynamicKeys(requestConfig.url, requestConfig.dynamicKeys as TIndexedObject | undefined)
  }

  return requestConfig
}

const requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

export {
  requestInterceptor,
  requestErrorInterceptor
}
