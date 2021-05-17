type UserEditLocalizationStrings = {
	idUserLabel: string;
	userUsernameLabel: string;
	userPasswordLabel: string;
	userDisplayNameLabel: string;
	userEmailLabel: string;
	userFirstNameLabel: string;
	userLastNameLabel: string;
	userAddressLabel: string;
	userAboutLabel: string;
	userDateCreatedLabel: string;
	userRolesLabel: string;
	userSavedText: string;
	userActiveLabel: string;
	saveUserButton: string;
	resetPassword: string;
	[keyLabel: string]: string;
}

const sr: UserEditLocalizationStrings = {
	idUserLabel: "ID",
	userAboutLabel: "Opis",
	userAddressLabel: "Adresa",
	userDateCreatedLabel: "Datum kreiranja",
	userDisplayNameLabel: "Ime za prikaz",
	userEmailLabel: "Email",
	userFirstNameLabel: "Ime",
	userLastNameLabel: "Prezime",
	userRolesLabel: "Role",
	userUsernameLabel: "Korisničko ime",
	userPasswordLabel: "Šifra",
	userSavedText: "Korisnik ažuriran",
	userActiveLabel: "Aktivan",
	resetPassword: "Resetuj šifru",
	saveUserButton: "Sačuvaj"
};

const en: UserEditLocalizationStrings = {
	idUserLabel: "ID",
	userAboutLabel: "About",
	userAddressLabel: "Address",
	userDateCreatedLabel: "Date created",
	userDisplayNameLabel: "Display name",
	userEmailLabel: "Email",
	userFirstNameLabel: "First name",
	userLastNameLabel: "Last name",
	userRolesLabel: "Roles",
	userUsernameLabel: "Username",
	userPasswordLabel:"Password",
	userActiveLabel: "Active",
	userSavedText: "User updated",
	resetPassword: "Reset password",
	saveUserButton: "Save"
};

const localization: Localized<UserEditLocalizationStrings> = {en, sr};

export default localization;
