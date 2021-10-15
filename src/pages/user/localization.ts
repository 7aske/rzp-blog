type UserPageLocalizationStrings = {
	loadMore: string;
	latestPosts: string;
	joined: string;
	[key: string]: string;
}

const sr: UserPageLocalizationStrings = {
	loadMore: "Učitaj još",
	latestPosts: "Najskorije objave",
	joined: "pridružio se"
};

const en: UserPageLocalizationStrings = {
	loadMore: "Load more",
	latestPosts:"Latest posts",
	joined: "joined"
};

const localization: Localized<UserPageLocalizationStrings> = {en, sr};

export default localization;
