type AdminPostsListLocalizationStrings = {
	headTitle: string;
	headSlug: string;
	headCategory: string;
	headStatus: string;
	headUpdated: string;
	headAuthor: string;
	published: string;
	newPostButton: string;
	editPostButton: string;
	deletePostButton: string;
	publish: string;
	unPublish: string;
	success: string;
	[key: string]: string;
}

const sr: AdminPostsListLocalizationStrings = {
	headCategory: "Kategorija",
	headSlug: "URL",
	headStatus: "Status",
	headTitle: "Naslov",
	headUpdated: "Ažurirano",
	published: "Obavljeno",
	newPostButton: "Nova Objava",
	editPostButton: "Izmeni",
	headAuthor: "Autor",
	publish: "Objavi",
	unPublish: "Povuci",
	success: "Uspešno",
	deletePostButton: "Obriši"
};

const en: AdminPostsListLocalizationStrings = {
	headCategory: "Category",
	headSlug: "URL",
	headStatus: "Status",
	headTitle: "Title",
	headUpdated: "Updated",
	published: "Published",
	newPostButton: "New Post",
	editPostButton: "Edit",
	headAuthor: "Author",
	publish: "Publish",
	unPublish: "Unpublish",
	success: "Successful",
	deletePostButton: "Delete"

};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
