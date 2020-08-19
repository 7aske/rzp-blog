type AdminPostsListPagePageLocalizationStrings = {
	sidebarPosts: string;
	sidebarCategories: string;
	sidebarTags: string;
	sidebarAuthors: string;
	[key: string]: string;
}

const sr: AdminPostsListPagePageLocalizationStrings = {
	sidebarAuthors: "Autori",
	sidebarCategories: "Kategorije",
	sidebarPosts: "Objave",
	sidebarTags: "Tagovi",
};

const en: AdminPostsListPagePageLocalizationStrings = {
	sidebarAuthors: "Authors",
	sidebarCategories: "Categories",
	sidebarPosts: "Posts",
	sidebarTags: "Tags",
};

const localization: Localized<AdminPostsListPagePageLocalizationStrings> = {en, sr};

export default localization;
