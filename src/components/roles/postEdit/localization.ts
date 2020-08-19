type AdminPostEditPageLocalizationStrings = {
	postTitleLabel: string;
	postTitlePlaceholder: string;
	postSlugLabel: string;
	postSlugPlaceholder: string;
	postCategoryLabel: string;
	postCategoryPlaceholder: string;
	postExcerptLabel: string;
	postExcerptPlaceholder: string;
	postPublishedLabel: string;
	postPublishedPlaceholder: string;
	savePostButton: string;
	deletePostButton: string;
	postSavedText: string;
	postDeletedText: string;
	postTagsLabel: string;
	[key: string]: string;
}

const sr: AdminPostEditPageLocalizationStrings = {
	postCategoryLabel: "Kategorija",
	postCategoryPlaceholder: "",
	postExcerptLabel: "Kratak opis",
	postExcerptPlaceholder: "Nešto ukratko o objavi",
	postPublishedLabel: "Objavljeno",
	postPublishedPlaceholder: "",
	postSlugLabel: "ULR Objave",
	postSlugPlaceholder: "url-objave",
	postTitleLabel: "Naslov",
	postTitlePlaceholder: "Naslov objave",
	deletePostButton: "Obriši",
	savePostButton: "Sačuvaj",
	postSavedText: "Objava sačuvana",
	postDeletedText: "Objava obrisana",
	postTagsLabel: "Tagovi",
};

const en: AdminPostEditPageLocalizationStrings = {
	postCategoryLabel: "Category",
	postCategoryPlaceholder: "",
	postExcerptLabel: "Excerpt",
	postExcerptPlaceholder: "Short summary of the post",
	postPublishedLabel: "Published",
	postPublishedPlaceholder: "",
	postSlugLabel: "Post URL",
	postSlugPlaceholder: "post-url",
	postTitleLabel: "Title",
	postTitlePlaceholder: "Post Title",
	deletePostButton: "Remove",
	savePostButton: "Save",
	postSavedText: "Post saved",
	postDeletedText: "Post deleted",
	postTagsLabel: "Tags",
};

const localization: Localized<AdminPostEditPageLocalizationStrings> = {en, sr};

export default localization;
