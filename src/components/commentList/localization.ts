type CommentListLocalizationStrings = {
	readMoreBtn: string;
	readLessBtn: string;
	loadMoreBtn: string;
	[key: string]: string;
}

const sr: CommentListLocalizationStrings = {
	readMoreBtn: "Više",
	readLessBtn: "Manje",
	loadMoreBtn: "Učitaj još"
};

const en: CommentListLocalizationStrings = {
	readMoreBtn: "More",
	readLessBtn: "Less",
	loadMoreBtn: "Load more"
};

const localization: Localized<CommentListLocalizationStrings> = {en, sr};

export default localization;
