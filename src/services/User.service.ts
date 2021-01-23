import AbstractHttpClient from "./client/AbstractHttpClient";
import { IUserService } from "../@types/services/UserService";
import { User } from "../@types/User";

export default class UserService extends AbstractHttpClient implements IUserService {


	constructor() {
		super("/users");
	}

	getPageCount(params: PostQueryParams | undefined): Promise<number> {
		return Promise.resolve(0);
	}

	public async getRoles(user: User) {
		return (await this.get(`/${user.id}/roles`)).data;
	}

	public deleteById(id: number): Promise<void> {
		return this.delete(`/${id}`);
	}

	public async getAll(): Promise<User[]> {
		return (await this.get("")).data;
	}

	public async getById(id: number): Promise<User> {
		return (await this.get(`/${id}`)).data;
	}

	public async getByUsername(username: string): Promise<User> {
		return (await this.get(`/${username}`)).data;
	}

	public register(user: User): Promise<User> {
		return this.post("/register", user);
	}

	public save(user: User): Promise<User> {
		return this.post("", user);
	}

	public update(user: User): Promise<User> {
		return this.put("", user);
	}

	updatePassword(password: string, confirmPassword: string, newPassword: string): Promise<void> {
		return this.put("/update-password", {password, confirmPassword, newPassword});
	}

	updateProperty(prop: string, value: string): Promise<User> {
		throw new Error("not implemented")
	}
}
