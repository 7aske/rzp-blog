type MediaViewLocalizationStrings = {
	height: string;
	width: string;
	size: string;
	copySuccess: string;
	copy: string;
	deleteSuccess: string;
	actions: string
	delete: string;
	search: string;
	keywords: string;
	save: string;
	[key: string]: string;
}

const sr: MediaViewLocalizationStrings = {
	height: "Visina",
	width: "Širina",
	size: "Veličina",
	deleteSuccess: "Obrisano",
	copySuccess: "Kopirano",
	copy: "Kopiraj",
	actions: "Akcije",
	delete: "Obriši",
	search: "Pretraži",
	keywords: "Ključne reči",
	save: "Sačuvaj",
};

const en: MediaViewLocalizationStrings = {
	height: "Height",
	width: "Width",
	size: "Size",
	deleteSuccess: "Deleted",
	copySuccess: "Copied",
	copy: "Copy",
	actions: "Actions",
	delete: "Delete",
	search: "Search",
	keywords: "Keywords",
	save:"Save",
};

const localization: Localized<MediaViewLocalizationStrings> = {en, sr};

export default localization;
