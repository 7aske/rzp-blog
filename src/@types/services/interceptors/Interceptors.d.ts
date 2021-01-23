import { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig
type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse
type ErrorInterceptor = (error: any) => Promise<any>
