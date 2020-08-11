type RoutesLocalizationStrings = {
	home: string;
	about: string;
	team: string;
	contact: string;
	website: string;
	blog: string;
	[key: string]: string;
}

const sr: RoutesLocalizationStrings = {
	about: "O Nama",
	website: "Sajt",
	contact: "Kontakt",
	home: "Početna",
	blog: "Blog",
	team: "Naš tim"
};

const en: RoutesLocalizationStrings = {
	about: "About",
	website: "Website",
	contact: "Contact",
	home: "Home",
	blog: "Blog",
	team: "Team"
};

const localization: Localized<RoutesLocalizationStrings> = {en, sr};

export default localization;
