type CommentInputLocalizationStrings = {
	labelText: string;
	buttonText: string;
	loginText: string;
	[key: string]: string;
}

const sr: CommentInputLocalizationStrings = {
	labelText: "Komentar",
	buttonText: "Pošalji",
	loginText: "Ulogujte se da bi komentarisali..."
};

const en: CommentInputLocalizationStrings = {
	labelText: "Comment",
	buttonText: "Submit",
	loginText: "Please login to comment..."
};

const localization: Localized<CommentInputLocalizationStrings> = {en, sr};

export default localization;
