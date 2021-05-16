type UserChangePasswordLocalizationStrings = {
	changePasswordText: string;
	changePasswordHint:string;
	[keyLabel: string]: string;
}

const sr: UserChangePasswordLocalizationStrings = {
	changePasswordHint: "Šifra mora da sadrži 8 karaktera, makar 1 veliko/malo slovo i 1 broj.",
	changePasswordText: "Vaša šifra je resetovana morate kreirati novu."
};

const en: UserChangePasswordLocalizationStrings = {
	changePasswordHint: "Your password must be at least 8 characters long and contain at least 1 number and 1 uppercase/lowercase letter.",
	changePasswordText: "Your password has been reset and you have to create a new one."
};

const localization: Localized<UserChangePasswordLocalizationStrings> = {en, sr};

export default localization;
