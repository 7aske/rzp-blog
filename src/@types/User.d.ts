import { User as ApiUser, Role } from "../api/api";

export interface User extends ApiUser {
	roles: Role[];
}

export interface UserCommentDTO {
	idUser: number;
	userUsername: string;
	userDisplayName: string;
	userEmail: string;
	userFirstName: string;
	userLastName: string;
}
