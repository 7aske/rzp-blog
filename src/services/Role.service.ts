import AbstractHttpClient from "./client/AbstractHttpClient";
import { IRoleService } from "../@types/services/RoleService";
import { Role } from "../@types/Role";

export default class RoleService extends AbstractHttpClient implements IRoleService {

	constructor() {
		super("/roles");
	}

	public deleteById(id: number): Promise<void> {
		return super.delete(`/${id}`)
	}

	public getAll(): Promise<Role[]> {
		return super.get("")
	}

	public save(role: Role): Promise<Role> {
		return super.post("", role);
	}

	public update(role: Role): Promise<Role> {
		return super.put("", role);
	}

}
