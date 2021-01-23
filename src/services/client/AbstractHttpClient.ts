import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { environment } from "../../environment";
import {
	RequestInterceptor,
	ErrorInterceptor,
	ResponseInterceptor,
} from "../../@types/services/interceptors/Interceptors";

export default abstract class AbstractHttpClient {
	private readonly _baseUrl: string;
	private readonly _client: AxiosInstance;

	protected constructor(baseUrl: string, config?: AxiosRequestConfig) {
		this._client = axios.create(config);
		this._baseUrl = environment.backendUrl + baseUrl;
	}

	protected attachRequestInterceptor(fulfilled: RequestInterceptor, rejected: ErrorInterceptor) {
		this._client.interceptors.request.use(fulfilled, rejected);
	}

	protected attachResponseInterceptor(fulfilled: ResponseInterceptor, rejected: ErrorInterceptor) {
		this._client.interceptors.response.use(fulfilled, rejected);
	}

	protected get(url: string, config?: AxiosRequestConfig): Promise<any> {
		return this._client.get(this._baseUrl + url, config);
	}

	protected head(url: string, config?: AxiosRequestConfig): Promise<any> {
		return this._client.head(this._baseUrl + url, config);
	}

	protected delete(url: string, config?: AxiosRequestConfig): Promise<any> {
		return this._client.delete(this._baseUrl + url, config);
	}

	protected options(url: string, config?: AxiosRequestConfig): Promise<any> {
		return this._client.options(this._baseUrl + url, config);
	}

	protected post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
		return this._client.post(this._baseUrl + url, data, config);
	}

	protected put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
		return this._client.put(this._baseUrl + url, data, config);
	}

	protected patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
		return this._client.patch(this._baseUrl + url, data, config);
	}
}
