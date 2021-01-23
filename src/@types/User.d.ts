import { Identifiable } from "./generic/Identifiable";
import { Auditable } from "./generic/Auditable";

export interface User extends Identifiable, Auditable {
	username: string;
	displayName: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	address: string;
	about: string;
	dateCreated: string;
	roles: Role[];
	active: boolean;
}

export interface UserCommentDTO {
	idUser: number;
	userUsername: string;
	userDisplayName: string;
	userEmail: string;
	userFirstName: string;
	userLastName: string;
}
