import { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export function authorizationOnFulfilled(config: AxiosRequestConfig) {
	config.headers["Authorization"] = `Bearer ${Cookies.get("auth")}`;
	return config;
}

export function authorizationOnRejected(error: any) {
	return Promise.reject(error);
}

