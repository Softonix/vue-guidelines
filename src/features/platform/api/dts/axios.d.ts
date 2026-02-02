/* eslint-disable */

import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'

export interface IAxiosRequestConfig<Path extends TPathKeys = string, Method extends TPathMethods<Path> = string> extends AxiosRequestConfig {
  dynamicKeys?: TRequestParameters<Path, Method>
  params?: TRequestQuery<Path, Method>
}

declare module 'axios' {
  export interface InternalAxiosRequestConfig extends IAxiosRequestConfig {}

  export interface AxiosInstance {
    get<Path extends TPathKeys>(url: Path, config?: IAxiosRequestConfig<Path, 'get'>): Promise<TResponse<Path, 'get'>>
    post<Path extends TPathKeys>(url: Path, data?: TRequestBody<Path, 'post'>, config?: IAxiosRequestConfig<Path, 'post'>): Promise<TResponse<Path, 'post'>>
    put<Path extends TPathKeys>(url: Path, data?: TRequestBody<Path, 'put'>, config?: IAxiosRequestConfig<Path, 'put'>): Promise<TResponse<Path, 'put'>>
    patch<Path extends TPathKeys>(url: Path, data?: Partial<TRequestBody<Path, 'patch'>>, config?: IAxiosRequestConfig<Path, 'patch'>): Promise<TResponse<Path, 'patch'>>
    delete<Path extends TPathKeys>(url: Path, config?: IAxiosRequestConfig<Path, 'delete'>): Promise<TResponse<Path, 'delete'>>
  }
}
