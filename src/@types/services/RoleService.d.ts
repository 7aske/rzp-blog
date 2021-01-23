import { Role } from "../Role";

interface IRoleService {
	getAll: () => Promise<Role[]>;
}
