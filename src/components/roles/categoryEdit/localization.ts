type AdminPostsListLocalizationStrings = {
	title: string;
	categorySelectLabel: string;
	categoryNewOption: string;
	categorySaveButton: string;
	categoryDeleteButton: string;
	categoryResetButton: string;
	categoryUpdateButton: string;
	categorySavedMessage: string;
	categoryDeletedMessage: string;
	categoryNotFoundMessage: string;
	categoryNameLabel: string;
	[key: string]: string;
}

const sr: AdminPostsListLocalizationStrings = {
	title: "Kategorije",
	categorySelectLabel: "Kategorije",
	categoryDeleteButton: "Obriši",
	categoryResetButton: "Resetuj",
	categoryNewOption: "Nova kategorija",
	categoryUpdateButton: "Ažuriraj",
	categorySaveButton: "Sačuvaj",
	categorySavedMessage: "Kategorija sačuvana",
	categoryDeletedMessage: "Kategorija obrisana",
	categoryNotFoundMessage: "Niste izabrali kategoriju",
	categoryNameLabel: "Ime Kategorije",
};

const en: AdminPostsListLocalizationStrings = {
	title: "Categories",
	categorySelectLabel: "Categories",
	categoryDeleteButton: "Remove",
	categoryResetButton: "Reset",
	categoryNewOption: "New category",
	categoryUpdateButton: "Update",
	categorySaveButton: "Save",
	categorySavedMessage: "Category saved",
	categoryDeletedMessage: "Category deleted",
	categoryNotFoundMessage: "You haven't selected a category",
	categoryNameLabel: "Category Name",
};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
