import { backendUrl } from "../../../globals";
import Console from "../../../utils/Console";
import { getClient } from "../../client/http";

const submodule = "admin";

const getAll = async (): Promise<Role[]> => {
	const client = getClient();
	const _roles = (await client.get(`${backendUrl}/${submodule}/role/getAll`)).data;
	Console.log(_roles);
	return _roles;
}
const adminRoleService: RoleService = {
	getAll,
};

export default adminRoleService;
