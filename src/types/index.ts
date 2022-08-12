export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'head'
  | 'HEAD'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse> {}

export interface AxiosError {
  message: string
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios{
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T=any>(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise<T>

  put<T=any>(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise<T>

  patch<T=any>(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise<T>
}

export interface AxiosInstance extends Axios{
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T>{
  use(resolve: ResolvedFn<T>, reject?: RejectFn): number
}

export interface ResolvedFn<T=any>{
  (val: T): T | Promise<T>
}

export interface RejectFn{
  (error: any): any
}
