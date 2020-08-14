type PostEditorLocalizationStrings = {
	fileTooLarge: string;
	importError: string;
	noFileGiven: string;
	typeNotAllowed: string;
	autosaved: string;
	[key: string]: string;
}

const sr: PostEditorLocalizationStrings = {
	fileTooLarge: "Slika je prevelika",
	importError: "Došlo je do greške",
	noFileGiven: "Nema fajla",
	typeNotAllowed: "Tipa fajla nije podržan",
	autosaved: "Sačuvano: "
};

const en: PostEditorLocalizationStrings = {
	fileTooLarge: "Image too large",
	importError: "There was an error",
	noFileGiven: "No file given",
	typeNotAllowed: "Image type not supported",
	autosaved: "Autosaved: "
};

const localization: Localized<PostEditorLocalizationStrings> = {en, sr};

export default localization;
