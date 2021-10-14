type ContactInputListLocalization = {
	title: string;
	type: string;
	value: string;
	// enums
	ADDRESS:string;
	PHONE:string;
	EMAIL:string;
	WEBSITE:string;
	[keyLabel: string]: string;
}

const sr: ContactInputListLocalization = {
	title: "Kontaktne informacije",
	ADDRESS: "Adresa",
	PHONE: "Telefon",
	EMAIL: "Email",
	WEBSITE: "Vebsajt",
	type: "Tip",
	value: "Vrednost"
};

const en: ContactInputListLocalization = {
	title: "Contact information",
	ADDRESS: "Address",
	PHONE: "Phone",
	EMAIL: "Email",
	WEBSITE: "Website",
	type: "Type",
	value: "Value"
};

const localization: Localized<ContactInputListLocalization> = {en, sr};

export default localization;
