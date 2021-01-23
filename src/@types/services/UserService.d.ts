import { User } from "../User";
import { Role } from "../Role";

interface IUserService {
	getAll: () => Promise<User[]>;
	getById: (id: number) => Promise<User>;
	getByUsername: (id: string) => Promise<User>;
	save: (user: User) => Promise<User>;
	update: (user: User) => Promise<User>;
	deleteById: (id: number) => Promise<void>;
	register: (user: User) => Promise<User>;
	updatePassword: (password:string, confirmPassword: string, newPassword: string) => Promise<void>;
	updateProperty: (prop: string, value: string) => Promise<User>;
	getPageCount: (params?: PostQueryParams) => Promise<number>,
	getRoles: (user: User) => Promise<Role[]>
}
