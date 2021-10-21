import { AxiosResponse, AxiosRequestConfig } from "axios";
import { environment } from "../../environment";
import Cookies from "js-cookie";

export default class Interceptors {

	public static loggingOnFulfilled(res: AxiosResponse) {
		if (!environment.production) console.log(res);
		return res;
	}

	public static loggingOnRejected(error: any) {
		if (!environment.production) console.error(error);
		return Promise.reject(error);
	}

	public static authorizationOnFulfilled(config: AxiosRequestConfig) {
		const auth = Cookies.get("auth")
		if (auth)
			config.headers["Authorization"] = `Bearer ${auth}`;
		const refresh = Cookies.get("refresh")
		if (refresh)
			config.headers["X-Refresh-Token"] = `Refresh ${refresh}`;
		return config;
	}

	public static authorizationOnRejected(error: any) {
		return Promise.reject(error);
	}

}
