import { backendUrl } from "../globals";
import { getClient } from "./client/http";

export const getById = async (id: number): Promise<User> => {
	const client = getClient();
	return (await client.get(`${backendUrl}/user/getById/${id}`)).data
}

const userService = {getById}

export default userService;
