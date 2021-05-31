type UtilsLocalizationStrings = {
	postStatusDeleted: string;
	postStatusActive: string;
	userStatusActive: string;
	userStatusExpired: string;
	userStatusDisabled: string;
	[key: string]: string;
}

const sr: UtilsLocalizationStrings = {
	postStatusActive: "Objavljen",
	postStatusDeleted: "Nije objavljen",
	userStatusActive: "Aktivan",
	userStatusExpired: "Šifra istekla",
	userStatusDisabled: "Deaktiviran",
};

const en: UtilsLocalizationStrings = {
	postStatusActive: "Published",
	postStatusDeleted: "Not published",
	userStatusActive: "Active",
	userStatusExpired: "Password expired",
	userStatusDisabled: "Disabled",
};

const localization: Localized<UtilsLocalizationStrings> = {en, sr};

export default localization;
