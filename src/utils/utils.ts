import * as H from "history";
import React from "react";

export const scrollToTop = (ev?: React.MouseEvent<any, any>) => {
	if (ev) ev.preventDefault();
	window.scroll({top: 0, left: 0, behavior: "smooth"});
};

export const formatDate = (date: string, locale = "en"): string => {
	const format: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric",
	};
	return new Date(date).toLocaleDateString(locale, format);
};

export const getHistoryErrors = (history: H.History<any>): string[] => {
	if (history.location.state && (history.location.state as any).error) {
		return [(history.location.state as any).error]
	}
	return [];
}
