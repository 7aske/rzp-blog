import axios from "axios";
import Cookies from "js-cookie";
import { backendUrl } from "../globals";
import { getClient } from "./client/http";

export const login = async (username: string, password: string) => {
	const bearer = (await axios.post(`${backendUrl}/auth/login`, {
		username, password,
	})).data;
	Cookies.set("auth", bearer.replace("Bearer ", ""))
	return bearer;
};



export const verify = async () => {
	const client = getClient();
	const res = await client.post(`${backendUrl}/auth/verify`);
	console.log(res);
};

const authService = {
	login,
	verify
};

export default authService;
