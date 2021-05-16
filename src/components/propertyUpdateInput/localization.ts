type PropertyUpdateInputLocalizationStrings = {
	success: string;
	successExpired: string;
	password: string;
	confirmPassword: string;
	newPassword: string;
	update: string;
	[key: string]: string;
}

const sr: PropertyUpdateInputLocalizationStrings = {
	success:"Sačuvano",
	successExpired: "Sačuvano. Mozete se ponovo ulogovati",
	confirmPassword: "Potvrdite šifru",
	newPassword: "Nova šifra",
	password: "Šifra",
	update:"Sačuvaj,"
};

const en: PropertyUpdateInputLocalizationStrings = {
	success: "Updated",
	successExpired: "Updated. You can relog",
	confirmPassword: "Confirm password",
	newPassword: "New password",
	password: "Password",
	update: "Update",
};

const localization: Localized<PropertyUpdateInputLocalizationStrings> = {en, sr};

export default localization;
