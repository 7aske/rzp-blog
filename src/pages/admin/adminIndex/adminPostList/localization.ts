type AdminPostsListLocalizationStrings = {
	headTitle: string;
	headSlug: string;
	headCategory: string;
	headStatus: string;
	headUpdated: string;
	published: string;
	[key: string]: string;
}

const sr: AdminPostsListLocalizationStrings = {
	headCategory: "Kategorija",
	headSlug: "URL",
	headStatus: "Status",
	headTitle: "Naslov",
	headUpdated: "Ažurirano",
	published: "Obavljeno"
};

const en: AdminPostsListLocalizationStrings = {
	headCategory: "Category",
	headSlug: "URL",
	headStatus: "Status",
	headTitle: "Title",
	headUpdated: "Updated",
	published: "Published"
};

const localization: Localized<AdminPostsListLocalizationStrings> = {en, sr};

export default localization;
