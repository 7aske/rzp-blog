type AdminPostsListLocalizationStrings = {
	headTitle: string;
	headSlug: string;
	headCategory: string;
	headStatus: string;
	headUpdated: string;
	headAuthor: string;
	published: string;
	newPostButton: string;
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
	headAuthor: "Autor"

};

const en: AdminPostsListLocalizationStrings = {
	headCategory: "Category",
	headSlug: "URL",
	headStatus: "Status",
	headTitle: "Title",
	headUpdated: "Updated",
	published: "Published",
	newPostButton: "New Post",
	headAuthor: "Author"
};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
