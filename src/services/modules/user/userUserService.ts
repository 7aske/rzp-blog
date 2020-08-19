import { backendUrl } from "../../../globals";
import Console from "../../../utils/Console";
import { getClient } from "../../client/http";

const updateProperty = async (property: string, value: any): Promise<UserDTO> => {
	const client = getClient();
	const user = (await client.put(`${backendUrl}/user/user/updateProperty`, {
		property,
		value,
	})).data;
	Console.log(user);
	return user;
};

const updatePassword = async (password: string, confirmPassword: string, newPassword: string): Promise<UserDTO> => {
	const client = getClient();
	const user = (await client.put(`${backendUrl}/user/user/updatePassword`, {
		password,
		confirmPassword,
		newPassword,
	})).data;
	Console.log(user);
	return user;
};

const userUserService = {
	updateProperty,
	updatePassword,
};

export default userUserService;