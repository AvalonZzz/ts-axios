import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectFn, ResolvedFn } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./InterceptorManager";
import mergeConfig from "./mergeConfig";

interface Interceptors{
  request: InterceptorManager<AxiosRequestConfig>

  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)

  rejected?: RejectFn
}

export default class Axios{
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig
  }

  request(url: any, config?: any): AxiosPromise{
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)
    
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise{
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise{
    return this._requestMethodWithData('post', url, config, data)
  }

  put(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise{
    return this._requestMethodWithData('put', url, config, data)
  }

  patch(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise{
    return this._requestMethodWithData('patch', url, config, data)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method: method,
      url
    }))
  }

  _requestMethodWithData(method: Method, url: string, config?: AxiosRequestConfig, data?: any) {
    return this.request(Object.assign(config || {}, {
      url,
      data,
      method
    }))
  }
}