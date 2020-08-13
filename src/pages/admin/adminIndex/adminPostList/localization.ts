type AdminPostsListLocalizationStrings = {
	headTitle: string;
	headSlug: string;
	headCategory: string;
	headStatus: string;
	headUpdated: string;
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
};

const en: AdminPostsListLocalizationStrings = {
	headCategory: "Category",
	headSlug: "URL",
	headStatus: "Status",
	headTitle: "Title",
	headUpdated: "Updated",
	published: "Published",
	newPostButton: "New Post",
};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
