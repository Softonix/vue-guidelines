import type { AxiosError, AxiosResponse } from 'axios'

const responseInterceptor = (response: AxiosResponse): Promise<AxiosResponse> => {
  return response.data
}

const errorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

export {
  responseInterceptor,
  errorInterceptor
}
