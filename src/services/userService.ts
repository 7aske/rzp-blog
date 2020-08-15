import { backendUrl } from "../globals";
import { getClient } from "./client/http";
import Console from "../utils/Console";

export const getById = async (id: number): Promise<UserDTO> => {
	const client = getClient();
	const user = (await client.get(`${backendUrl}/user/getById/${id}`)).data;
	Console.log(user)
	return user;
};

const userService = {getById};

export default userService;
