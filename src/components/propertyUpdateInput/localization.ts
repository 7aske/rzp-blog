type PropertyUpdateInputLocalizationStrings = {
	success: string;
	password: string;
	confirmPassword: string;
	newPassword: string;
	update: string;
	[key: string]: string;
}

const sr: PropertyUpdateInputLocalizationStrings = {
	success:"Sačuvano",
	confirmPassword: "Potvrdite šifru",
	newPassword: "Nova šifra",
	password: "Šifra",
	update:"Sačuvaj,"
};

const en: PropertyUpdateInputLocalizationStrings = {
	success: "Updated",
	confirmPassword: "Confirm password",
	newPassword: "New password",
	password: "Password",
	update: "Update",
};

const localization: Localized<PropertyUpdateInputLocalizationStrings> = {en, sr};

export default localization;
