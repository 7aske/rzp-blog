type NavbarLocalizationStrings = {
	notifications: string;
	noNotifications: string;
	[key: string]: string;
}

const sr: NavbarLocalizationStrings = {
	notifications: "Obaveštenja",
	noNotifications: "Nema obaveštenja",
};

const en: NavbarLocalizationStrings = {
	notifications: "Notifications",
	noNotifications: "No notifications",
};

const localization: Record<string, NavbarLocalizationStrings> = {en, sr};

export default localization;
