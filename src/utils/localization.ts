type UtilsLocalizationStrings = {
	postStatusDeleted: string;
	postStatusActive: string;
	userStatusActive: string;
	userStatusExpired: string;
	[key: string]: string;
}

const sr: UtilsLocalizationStrings = {
	postStatusActive: "Objavljen",
	postStatusDeleted: "Nije objavljen",
	userStatusActive: "Aktivan",
	userStatusExpired: "Istekao",
};

const en: UtilsLocalizationStrings = {
	postStatusActive: "Published",
	postStatusDeleted: "Not published",
	userStatusActive: "Active",
	userStatusExpired: "Expired",
};

const localization: Localized<UtilsLocalizationStrings> = {en, sr};

export default localization;
