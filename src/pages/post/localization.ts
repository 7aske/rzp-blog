type PostPageLocalizationStrings = {
	back: string;
	commentTitle: string;
	[key: string]: string;
}

const sr: PostPageLocalizationStrings = {
	back: "Nazad",
	commentTitle: "Komentari",
};

const en: PostPageLocalizationStrings = {
	back: "Back",
	commentTitle: "Comments",
};

const localization: Localized<PostPageLocalizationStrings> = {en, sr};

export default localization;
