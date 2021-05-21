type MediaViewLocalizationStrings = {
	height: string;
	width: string;
	size: string;
	copySuccess: string;
	deleteSuccess:string;
	[key: string]: string;
}

const sr: MediaViewLocalizationStrings = {
	height: "Visina",
	width: "Širina",
	size: "Veličina",
	deleteSuccess: "Obrisano",
	copySuccess: "Kopirano"
};

const en: MediaViewLocalizationStrings = {
	height: "Height",
	width: "Width",
	size: "Size",
	deleteSuccess: "Deleted",
	copySuccess: "Copied"
};

const localization: Localized<MediaViewLocalizationStrings> = {en, sr};

export default localization;
