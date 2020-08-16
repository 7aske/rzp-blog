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
	[key: string]: string | number | string[];
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
