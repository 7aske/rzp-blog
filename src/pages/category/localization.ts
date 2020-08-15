type CategoryPageLocalizationStrings = {
	title: string;
	chooseCategoryText: string;
	[key: string]: string;
}

const sr: CategoryPageLocalizationStrings = {
	title: "Kategorija",
	chooseCategoryText:"Izaberite kategoriju"
};

const en: CategoryPageLocalizationStrings = {
	title: "Category",
	chooseCategoryText: "Choose category"
};

const localization: Localized<CategoryPageLocalizationStrings> = {en, sr};

export default localization;
