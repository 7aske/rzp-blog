import React from "react";
import { Link } from "react-router-dom";

export enum MenuItemType {
	ANCHOR,
	LINK,
}

export class MenuItemBuilder {

	private readonly instance: MenuItem;

	constructor(href: string, text: string, type = MenuItemType.LINK) {
		let elem;
		switch (type) {
			case MenuItemType.ANCHOR:
				elem = <a target="blank" href={href}>{text}</a>;
				break;
			default:
				elem = <Link className="sidenav-close" to={href}>{text}</Link>;
				break;

		}
		this.instance = new MenuItem(elem, 0, [], null);
	}

	public roles(roles: string[]) {
		this.instance.roles = roles;
		return this;
	}

	public order(order: number) {
		this.instance.order = order;
		return this;
	}

	public loggedIn(loggedIn: boolean | null) {
		this.instance.loggedIn = loggedIn;
		return this;
	}

	public special() {
		this.instance.special = true;
		return this;
	}

	public build() {
		return this.instance;

	}
}

export class MenuItem {
	locale: string;
	roles: string[];
	loggedIn: boolean | null;
	order: number;
	element: JSX.Element;
	special: boolean;

	constructor(element: JSX.Element,
	            order = 0,
	            roles: string[] = [],
	            loggedIn: boolean | null = null,
	            special = false,
	            locale = "en") {

		this.locale = locale;
		this.roles = roles;
		this.loggedIn = loggedIn;
		this.order = order;
		this.element = element;
		this.special = special;
	}
}
