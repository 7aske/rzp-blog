import { useCookies } from "react-cookie";

export const defaultLocale:Locale = "en";
export const locales:Locale[] = ["en", "sr"];
export const localeCookieName = "locale";

const useLocale = (): [Locale, (locale:Locale) => void] => {
	const [cookies, setCookie] = useCookies([localeCookieName]);

	if (!cookies.locale || locales.indexOf(cookies.locale) === -1) {
		setCookie(localeCookieName, defaultLocale);
	}

	const locale: Locale = cookies.locale || defaultLocale;

	const setLocale = (_locale: Locale) => {
		if (locales.indexOf(_locale) !== -1) {
			setCookie(localeCookieName, _locale);
		}
	};

	return [locale, setLocale];
};

export default useLocale;
