type UserViewLocalizationStrings = {
	headUsername: string;
	headDisplayName: string;
	headEmail: string;
	headRoles: string;
	headActive: string;
	newUserButton: string;
	[key: string]: string;
}

const sr: UserViewLocalizationStrings = {
	headActive: "Aktivan",
	headDisplayName: "Prikaz",
	headEmail: "Email",
	headRoles: "Role",
	headUsername: "Korisničko ime",
	newUserButton: "Novi korisnik",
};

const en: UserViewLocalizationStrings = {
	headActive: "Active",
	headDisplayName: "Display name",
	headEmail: "Email",
	headRoles: "Roles",
	headUsername: "Username",
	newUserButton: "New user",
};

const localization: Localized<UserViewLocalizationStrings> = {en, sr};

export default localization;
