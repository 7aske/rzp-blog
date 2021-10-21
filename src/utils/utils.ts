import * as H from "history";
import React from "react";
import { Role } from "../api/api";

export const scrollToTop = (ev?: React.MouseEvent<any, any>) => {
	if (ev) ev.preventDefault();
	window.scroll({top: 0, left: 0, behavior: "smooth"});
};

export const scrollTo = (id: string) => {
	if (!id) return;
	const elem = document.querySelector(id);
	if (elem) elem.scrollIntoView({behavior: "smooth", block:"start"})
};

export const formatDate = (date: string, locale = "en"): string => {
	const format: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric",
	};
	return new Date(date).toLocaleDateString(locale, format);
};


export const formatDateTime = (date: string, locale = "en"): string => {
	const format: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	};
	return new Date(date).toLocaleDateString(locale, format);
};

export const getHistoryErrors = (history: H.History<any>): string[] => {
	if (history.location.state && (history.location.state as any).error) {
		return [(history.location.state as any).error];
	}
	return [];
};

export const hasRole = (roles: Role[] | string[], role: string): boolean => {
	return (roles as any[]).find(r => r.name ? r.name.toUpperCase() === role.toUpperCase() : r.toUpperCase() === role.toUpperCase()) !== undefined;
};

export const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.substring(1);
};

export const humanFileSize = (bytes: number, si = false, dp = 1) => {
	const thresh = si ? 1000 : 1024;

	if (Math.abs(bytes) < thresh) {
		return bytes + " B";
	}

	const units = si
		? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		: ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
	let u = -1;
	const r = 10 ** dp;

	do {
		bytes /= thresh;
		++u;
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


	return bytes.toFixed(dp) + " " + units[u];
}
