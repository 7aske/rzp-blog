type CommentInputLocalizationStrings = {
	labelText: string;
	buttonText: string;
	[key: string]: string;
}

const sr: CommentInputLocalizationStrings = {
	labelText: "Komentar",
	buttonText: "Pošalji",
};

const en: CommentInputLocalizationStrings = {
	labelText: "Comment",
	buttonText: "Submit"
};

const localization: Localized<CommentInputLocalizationStrings> = {en, sr};

export default localization;
