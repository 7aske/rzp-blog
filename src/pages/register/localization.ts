type RegisterPageLocalizationStrings = {
	registerTitle: string;
	idUserLabel: string;
	userUsernameLabel: string;
	userPasswordLabel: string;
	userConfirmLabel: string;
	userDisplayNameLabel: string;
	userEmailLabel: string;
	userFirstNameLabel: string;
	userLastNameLabel: string;
	userAddressLabel: string;
	userAboutLabel: string;
	userDateCreatedLabel: string;
	userRolesLabel: string;
	successText: string;
	registerButton: string;
	[keyLabel: string]: string;
}

const sr: RegisterPageLocalizationStrings = {
	registerTitle: "Registracija",
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
	userConfirmLabel: "Potvrda šifre",
	successText: "Registracija uspešna. Bićete preusmereni",
	registerButton: "Registracija"
};

const en: RegisterPageLocalizationStrings = {
	registerTitle: "Registration",
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
	userConfirmLabel: "Confirm password",
	successText: "Success. You will be redirected",
	registerButton: "Register"
};

const localization: Localized<RegisterPageLocalizationStrings> = {en, sr};

export default localization;
