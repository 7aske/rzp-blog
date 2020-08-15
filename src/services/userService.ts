import { backendUrl } from "../globals";
import { getClient } from "./client/http";

export const getById = async (id: number): Promise<UserDTO> => {
	const client = getClient();
	const user = (await client.get(`${backendUrl}/user/getById/${id}`)).data;
	console.log(user)
	return user;
};

const userService = {getById};

export default userService;
