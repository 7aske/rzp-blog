type RoutesLocalizationStrings = {
	home: string;
	about: string;
	team: string;
	contact: string;
	website: string;
	blog: string;
	login: string;
	logout: string;
	profile: string;
	users: string;
	posts: string;
	tags: string;
	[key: string]: string;
}

const sr: RoutesLocalizationStrings = {
	about: "O Nama",
	website: "Sajt",
	contact: "Kontakt",
	home: "Početna",
	blog: "Blog",
	team: "Naš tim",
	login: "Uloguj se",
	logout: "Izloguj se",
	profile: "Profil",
	users: "Korisnici",
	posts: "Objave",
	tags: "Tagovi",
};

const en: RoutesLocalizationStrings = {
	about: "About",
	website: "Website",
	contact: "Contact",
	home: "Home",
	blog: "Blog",
	team: "Team",
	login: "Login",
	logout: "Logout",
	profile: "Profile",
	users:"Users",
	posts: "Posts",
	tags: "Tags"
};

const localization: Localized<RoutesLocalizationStrings> = {en, sr};

export default localization;
