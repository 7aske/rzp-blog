type CommentListLocalizationStrings = {
	readMoreBtn: string;
	readLessBtn: string;
	[key: string]: string;
}

const sr: CommentListLocalizationStrings = {
	readMoreBtn: "Više",
	readLessBtn: "Manje"
};

const en: CommentListLocalizationStrings = {
	readMoreBtn: "More",
	readLessBtn: "Less",
};

const localization: Localized<CommentListLocalizationStrings> = {en, sr};

export default localization;
