import AbstractHttpClient from "./client/AbstractHttpClient";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export default class AuthService extends AbstractHttpClient {


	constructor() {
		super("");
	}

	public async login(credentials:{username: string, password:string}) {
		const loginResponse = (await this.post("/login", credentials)).data;
		Cookies.set("auth", loginResponse.token);
		return jwtDecode(loginResponse.token);
	}

	public async verify(){
		const token = Cookies.get("auth");
		if (token)
			return jwtDecode(token) as any;
		throw new Error("Please log in")
	}

}
