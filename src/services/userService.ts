import axios from "axios";
import { backendUrl } from "../globals";
import Console from "../utils/Console";
import { getClient } from "./client/http";

const getById = async (id: number): Promise<UserDTO> => {
	const client = getClient();
	const user = (await client.get(`${backendUrl}/user/getById/${id}`)).data;
	Console.log(user);
	return user;
};

const register = async (user: User): Promise<UserDTO> => {
	const _user = (await axios.post(`${backendUrl}/user/register`, user)).data;
	Console.log(_user);
	return _user;
};


const userService: UserService = {getById, register};

export default userService;
