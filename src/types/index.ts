export type Method = 'get' | 'GET' | 'post' | 'POST' | 'options' | 'OPTIONS' | 'delete' | 'DELETE' | 'put' | 'PUT' | 'patch' | 'PATCH' | 'head' | 'HEAD'

export interface AxiosRequestConfig {
    url: string,
    method?: Method,
    params?: any,
    data?: any
}