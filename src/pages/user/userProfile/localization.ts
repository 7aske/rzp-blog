type UserProfilePageLocalizationStrings = {
	sidebarInfo: string
	sidebarSecurity: string
	userUsername: string;
	userDisplayName: string;
	userEmail: string;
	userFirstName: string;
	userLastName: string;
	userAddress: string;
	userAbout: string;
	userDateCreated: string;
	userRoles: string;
	[key: string]: string;
}

const sr: UserProfilePageLocalizationStrings = {
	userAbout: "Opis",
	userAddress: "Adresa",
	userDateCreated: "Datum kreiranja",
	userDisplayName: "Ime za prikaz",
	userEmail: "Email",
	userFirstName: "Ime",
	userLastName: "Prezime",
	userRoles: "Role",
	userUsername: "Korisničko ime",
	sidebarInfo: "Informacije",
	sidebarSecurity: "Bezbednost",
};

const en: UserProfilePageLocalizationStrings = {
	userAbout: "About",
	userAddress: "Address",
	userDateCreated: "Date created",
	userDisplayName: "Display name",
	userEmail: "Email",
	userFirstName: "First name",
	userLastName: "Last name",
	userRoles: "Roles",
	userUsername: "Username",
	sidebarInfo: "Info",
	sidebarSecurity: "Security",
};

const localization: Localized<UserProfilePageLocalizationStrings> = {en, sr};

export default localization;
