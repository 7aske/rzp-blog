type CommentInputLocalizationStrings = {
	labelText: string;
	buttonText: string;
	loginText: string;
	success: string;
	[key: string]: string;
}

const sr: CommentInputLocalizationStrings = {
	labelText: "Komentar",
	buttonText: "Pošalji",
	success: "Poslato",
	loginText: "Ulogujte se da bi komentarisali..."
};

const en: CommentInputLocalizationStrings = {
	labelText: "Comment",
	buttonText: "Submit",
	success: "Sent",
	loginText: "Please login to comment..."
};

const localization: Localized<CommentInputLocalizationStrings> = {en, sr};

export default localization;
