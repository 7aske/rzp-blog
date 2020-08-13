type AdminPostsListLocalizationStrings = {
	categorySelectLabel: string;
	categoryNewOption: string;
	categorySaveButton: string;
	categoryDeleteButton: string;
	categoryUpdateButton: string;
	categorySavedMessage: string;
	categoryDeletedMessage: string;
	categoryNotFoundMessage: string;
	categoryNameLabel: string;
	[key: string]: string;
}

const sr: AdminPostsListLocalizationStrings = {
	categorySelectLabel: "Kategorije",
	categoryDeleteButton: "Obriši",
	categoryNewOption: "Nova kategorija",
	categoryUpdateButton: "Ažuriraj",
	categorySaveButton: "Sačuvaj",
	categorySavedMessage: "Kategorija sačuvana",
	categoryDeletedMessage: "Kategorija obrisana",
	categoryNotFoundMessage: "Niste izabrali kategoriju",
	categoryNameLabel: "Ime Kategorije",
};

const en: AdminPostsListLocalizationStrings = {
	categorySelectLabel: "Categories",
	categoryDeleteButton: "Remove",
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
