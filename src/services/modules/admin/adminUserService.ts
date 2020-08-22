import { backendUrl } from "../../../globals";
import Console from "../../../utils/Console";
import { getClient } from "../../client/http";

const submodule = "admin";

const getAll = async (): Promise<UserDTO[]> => {
	const client = getClient();
	const _users = (await client.get(`${backendUrl}/${submodule}/user/getAll`)).data;
	Console.log(_users);
	return _users;
};

const getById = async (idUser: number): Promise<UserDTO> => {
	const client = getClient();
	const _user = (await client.get(`${backendUrl}/${submodule}/user/getById/${idUser}`)).data;
	Console.log(_user);
	return _user;
};

const save = async (user: User): Promise<UserDTO> => {
	const client = getClient();
	const _user = (await client.post(`${backendUrl}/${submodule}/user/save`, user)).data;
	Console.log(_user);
	return _user;
};

const update = async (user: UserDTO): Promise<UserDTO> => {
	const client = getClient();
	const _user = (await client.put(`${backendUrl}/${submodule}/user/update`, user)).data;
	Console.log(_user);
	return _user;
};

const deleteById = async (idUser: number): Promise<boolean> => {
	const client = getClient();
	const retval = (await client.delete(`${backendUrl}/${submodule}/user/deleteById/${idUser}`)).data;
	Console.log(retval);
	return retval;
};

const adminUserService: AdminUserService = {
	deleteById, getAll, getById, save, update,
};

export default adminUserService;
