import axios from 'axios'

import {
  requestErrorInterceptor,
  requestInterceptor,
  errorInterceptor,
  responseInterceptor
} from './interceptors'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.response.use(
  res => responseInterceptor(res),
  err => errorInterceptor(err)
)

instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor)

export const apiClient = instance
