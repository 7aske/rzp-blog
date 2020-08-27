type AdminPostsListLocalizationStrings = {
	title: string;
	tagSelectLabel: string;
	tagNewOption: string;
	tagSaveButton: string;
	tagDeleteButton: string;
	tagUpdateButton: string;
	tagSavedMessage: string;
	tagDeletedMessage: string;
	tagNotFoundMessage: string;
	tagNameLabel: string;
	[key: string]: string;
}

const sr: AdminPostsListLocalizationStrings = {
	title: "Tagovi",
	tagSelectLabel: "Tagovi",
	tagDeleteButton: "Obriši",
	tagNewOption: "Novi tag",
	tagUpdateButton: "Ažuriraj",
	tagSaveButton: "Sačuvaj",
	tagSavedMessage: "Tag sačuvan",
	tagDeletedMessage: "Tag obrisan",
	tagNotFoundMessage: "Niste izabrali tag",
	tagNameLabel: "Ime Taga",
};

const en: AdminPostsListLocalizationStrings = {
	title: "Tags",
	tagSelectLabel: "Tags",
	tagDeleteButton: "Remove",
	tagNewOption: "New tag",
	tagUpdateButton: "Update",
	tagSaveButton: "Save",
	tagSavedMessage: "Tag saved",
	tagDeletedMessage: "Tag deleted",
	tagNotFoundMessage: "You haven't selected a tag",
	tagNameLabel: "Tag Name",
};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
