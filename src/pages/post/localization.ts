type PostPageLocalizationStrings = {
	back: string;
	[key: string]: string;
}

const sr: PostPageLocalizationStrings = {
	back: "Nazad",
};

const en: PostPageLocalizationStrings = {
	back: "Back",
};

const localization: Localized<PostPageLocalizationStrings> = {en, sr};

export default localization;
