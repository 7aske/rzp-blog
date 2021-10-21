import AbstractHttpClient from "./client/AbstractHttpClient";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Interceptors from "./interceptors/Interceptors";

export default class AuthService extends AbstractHttpClient {


	constructor() {
		super("");
		this.attachRequestInterceptor(Interceptors.authorizationOnFulfilled, Interceptors.authorizationOnRejected);
	}

	public async login(credentials:{username: string, password:string}) {
		const loginResponse = (await this.post("/login", credentials)).data;
		Cookies.set("auth", loginResponse.token);
		Cookies.set("refresh", loginResponse.refresh);
		return jwtDecode(loginResponse.token);
	}

	public async refresh() {
		const loginResponse = (await this.post("/auth/refresh")).data;
		Cookies.set("auth", loginResponse.token);
		Cookies.set("refresh", loginResponse.refresh);
		return jwtDecode(loginResponse.token);
	}

	public async verify(){
		const token = Cookies.get("auth");
		if (token)
			return jwtDecode(token) as any;
		throw new Error("Please log in")
	}

}
