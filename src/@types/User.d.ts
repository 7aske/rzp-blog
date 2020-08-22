type UserDTO = {
	idUser: number;
	userUsername: string;
	userDisplayName: string;
	userEmail: string;
	userFirstName: string;
	userLastName: string;
	userAddress: string;
	userAbout: string;
	userDateCreated: string;
	userRoles: string[];
	userActive: boolean;
	[key: string]: string | number | string[] | boolean;
}

type User = {
	idUser: number;
	userUsername: string;
	userDisplayName: string;
	userEmail: string;
	userFirstName: string;
	userLastName: string;
	userPassword: string;
	userAddress: string;
	userAbout: string;
	userDateCreated: string;
	userRoles: Role[];
	userActive: boolean;
	[key: string]: string | number | Role[] | boolean;
}

type UserCommentDTO = {
	idUser: number;
	userUsername: string;
	userDisplayName: string;
	userEmail: string;
	userFirstName: string;
	userLastName: string;
	[key: string]: string | number;
}
