import { getErrorText } from "../pages/errors/localization";

export default class Toast {
	public static showSuccess(msg: string) {
		M.toast({html: msg, classes: "green accent-2 theme-grey-text"});
	}

	public static showError(error: any, locale?: string): void;
	public static showError(error: any, locale: string): void {
		const classes = "red accent-2 theme-grey-text";
		if (locale === undefined) {
			M.toast({html: error, classes});
		} else {
			M.toast({html: getErrorText(error, locale), classes});
		}
	}
}
