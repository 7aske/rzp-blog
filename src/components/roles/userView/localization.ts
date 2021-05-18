type UserViewLocalizationStrings = {
	headUsername: string;
	headDisplayName: string;
	headEmail: string;
	headRoles: string;
	headActive: string;
	newUserButton: string;
	editUserButton: string;
	resetUserButton: string;
	successAction: string;
	deleteUserButton: string;
	[key: string]: string;
}

const sr: UserViewLocalizationStrings = {
	headActive: "Aktivan",
	headDisplayName: "Prikaz",
	headEmail: "Email",
	headRoles: "Role",
	headUsername: "Korisničko ime",
	editUserButton: "Izmeni",
	newUserButton: "Novi korisnik",
	resetUserButton: "Resetuj šifru",
	deleteUserButton: "Obriši",
	successAction: "Uspešno"
};

const en: UserViewLocalizationStrings = {
	headActive: "Active",
	headDisplayName: "Display name",
	headEmail: "Email",
	headRoles: "Roles",
	headUsername: "Username",
	editUserButton: "Edit",
	resetUserButton: "Reset password",
	newUserButton: "New user",
	deleteUserButton: "Delete",
	successAction: "Success"
};

const localization: Localized<UserViewLocalizationStrings> = {en, sr};

export default localization;
