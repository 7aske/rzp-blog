interface UserUserService {
	updateProperty: (property: string, value: any) => Promise<UserDTO>;
	updatePassword: (password: string, confirmPassword: string, newPassword: string) => Promise<UserDTO>;
	register: (user: UserDTO) => Promise<UserDTO>;
}

interface AdminUserService {
	getAll: () => Promise<UserDTO[]>;
	getById: (idUser: number) => Promise<UserDTO>;
	save: (user: User) => Promise<UserDTO>;
	update: (user: UserDTO) => Promise<UserDTO>;
	deleteById: (idUser: number) => Promise<boolean>;
}

interface UserService {
	register: (user: User) => Promise<UserDTO>;
	getById: (idUser: number) => Promise<UserDTO>;
}
