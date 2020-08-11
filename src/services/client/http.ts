import axios, {AxiosRequestConfig} from "axios";
import { authorizationOnFulfilled, authorizationOnRejected } from "../interceptors/authorizationInterceptor";

export const getClient = (config?: AxiosRequestConfig) => {
	const instance = axios.create(config);
	instance.interceptors.request.use(authorizationOnFulfilled, authorizationOnRejected);
	return instance;
}
