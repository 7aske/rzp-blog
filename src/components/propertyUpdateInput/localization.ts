type PropertyUpdateInputLocalizationStrings = {
	success: string;
	[key: string]: string;
}

const sr: PropertyUpdateInputLocalizationStrings = {
	success:"Sačuvano"
};

const en: PropertyUpdateInputLocalizationStrings = {
	success: "Updated"
};

const localization: Localized<PropertyUpdateInputLocalizationStrings> = {en, sr};

export default localization;
