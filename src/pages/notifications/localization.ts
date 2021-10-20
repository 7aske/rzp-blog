type PostPageLocalizationStrings = {
	noNotifications: string
	loadMore: string;
	[key: string]: string;
}

const sr: PostPageLocalizationStrings = {
	noNotifications: "Nema novih obaveštenja",
	loadMore: "Učitaj još",
};

const en: PostPageLocalizationStrings = {
	noNotifications: "No new notifications",
	loadMore: "Load more",
};

const localization: Localized<PostPageLocalizationStrings> = {en, sr};

export default localization;
