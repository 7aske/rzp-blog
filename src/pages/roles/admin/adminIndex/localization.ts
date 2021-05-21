type AdminPostsListPagePageLocalizationStrings = {
	sidebarPosts: string;
	sidebarCategories: string;
	sidebarTags: string;
	sidebarAuthors: string;
	sidebarMedia: string;
	[key: string]: string;
}

const sr: AdminPostsListPagePageLocalizationStrings = {
	sidebarAuthors: "Autori",
	sidebarCategories: "Kategorije",
	sidebarPosts: "Objave",
	sidebarTags: "Tagovi",
	sidebarMedia: "Media",

};

const en: AdminPostsListPagePageLocalizationStrings = {
	sidebarAuthors: "Authors",
	sidebarCategories: "Categories",
	sidebarPosts: "Posts",
	sidebarTags: "Tags",
	sidebarMedia: "Media",
};

const localization: Localized<AdminPostsListPagePageLocalizationStrings> = {en, sr};

export default localization;
