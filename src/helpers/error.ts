import { AxiosRequestConfig, AxiosResponse } from '../types'
export class AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string|null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string|null,
    request?:any,
    response?: AxiosResponse
  ){
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    // 继承内置对象必须调用下面那句代码
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string|null,
  request?:any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response)
}