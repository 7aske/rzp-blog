type AdminPostsListLocalizationStrings = {
	categorySelectLabel: string;
	categoryNewOption: string;
	[key: string]: string;
}

const sr: AdminPostsListLocalizationStrings = {
	categoryNewOption: "Nova Kategorija",
	categorySelectLabel: "Kategorije"
};

const en: AdminPostsListLocalizationStrings = {
	categoryNewOption: "New Category",
	categorySelectLabel: "Categories",
};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
