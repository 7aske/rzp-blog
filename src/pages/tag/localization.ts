type PagePageLocalizationStrings = {
	title: string;
	choosePageText: string;
	[key: string]: string;
}

const sr: PagePageLocalizationStrings = {
	title: "Tag",
	choosePageText:"Izaberite tag"
};

const en: PagePageLocalizationStrings = {
	title: "Tag",
	choosePageText: "Choose tag"
};

const localization: Localized<PagePageLocalizationStrings> = {en, sr};

export default localization;
