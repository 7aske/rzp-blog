import React from "react";

class MenuItem {
	locale: string;
	roles: string[];
	loggedIn: boolean | null;
	order: number;
	element: JSX.Element;
	special: boolean;

	constructor(element: JSX.Element, order: number, roles: string[], loggedIn: boolean | null, special = false, locale = "en") {
		this.locale = locale;
		this.roles = roles;
		this.loggedIn = loggedIn;
		this.order = order;
		this.element = element;
		this.special = special;
	}

}

export default MenuItem;
