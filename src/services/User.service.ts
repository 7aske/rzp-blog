import { UserControllerApi, Role, User, RegisterUserDto } from "../api/api";
import {User as AppUser} from "../@types/User";
import { AxiosResponse } from "axios";

export default class UserService {
	private service = new UserControllerApi();

	public async getRoles(user: User|AppUser): Promise<AxiosResponse<Role[]>> {
		return  this.service.getAllUserRoles(user.id!);
	}

	public deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deleteUserById(id);
	}

	public async getAll(): Promise<AxiosResponse<Array<User>>> {
		return this.service.getAllUsers()
	}

	public async getById(id: number): Promise<AxiosResponse<User>> {
		return this.service.getUserById(String(id));
	}

	public async getByUsername(username: string): Promise<AxiosResponse<User>> {
		return this.service.getUserById(username);
	}

	public register(dto: RegisterUserDto): Promise<AxiosResponse<User>> {
		return this.service.registerUser(dto);
	}

	public save(user: User): Promise<AxiosResponse<User>> {
		return this.service.saveUser(user)
	}

	public update(user: User): Promise<AxiosResponse<User>> {
		return this.service.updateUser(user)
	}

	public updatePassword(passwordDto:{previous: string, confirm: string, password: string}): Promise<AxiosResponse<void>> {
		return this.service.updateUserPassword(passwordDto);
	}

	public resetPassword(userId: number): Promise<AxiosResponse<void>> {
		return this.service.resetUserPassword(userId);
	}

	public updateProperty(prop: string, value: string): Promise<User> {
		throw new Error("Not Implemented");
	}
}
