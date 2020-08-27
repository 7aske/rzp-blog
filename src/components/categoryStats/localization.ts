type CategoryStatsLocalizationStrings = {
	title: string;
	noData: string;
	total: string;
	[key: string]: string;
}

const sr: CategoryStatsLocalizationStrings = {
	title: "Statistika",
	noData: "Nema podataka",
	total: "Ukupno",
};

const en: CategoryStatsLocalizationStrings = {
	title: "Stats",
	noData: "No data",
	total: "Total"
};

const localization: Localized<CategoryStatsLocalizationStrings> = {en, sr};

export default localization;
