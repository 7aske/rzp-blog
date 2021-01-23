import React from "react";
import routes from "../../router/localization";
import { LocaleSwitch } from "../localization/LocaleSwitch";
import { MenuItem, MenuItemBuilder, MenuItemType } from "./MenuItem";
import { environment } from "../../environment";

class MenuBuilder {
	private navItems: MenuItem[];

	private loggedInRules: Set<boolean | null>;
	private roleRules: Set<string>;

	private locale: string;

	constructor(locale: string) {
		const {websiteUrl} = environment;
		this.locale = locale;

		this.navItems = [
			new MenuItemBuilder("/", routes[this.locale].home)
				.order(0).build(),
			new MenuItemBuilder(websiteUrl!, routes[this.locale].website, MenuItemType.ANCHOR)
				.order(1).build(),
			new MenuItemBuilder("/user/profile", routes[this.locale].profile)
				.order(20).roles(["user"]).loggedIn(true).build(),
			new MenuItemBuilder("/admin/posts", routes[this.locale].posts)
				.order(100).roles(["author", "admin"]).loggedIn(true).build(),
			new MenuItemBuilder("/login", routes[this.locale].login)
				.order(900).loggedIn(false).build(),
			new MenuItemBuilder("/register", routes[this.locale].register)
				.order(901).loggedIn(false).build(),
			new MenuItemBuilder("/logout", routes[this.locale].logout)
				.order(902).loggedIn(true).build(),
			new MenuItem(<LocaleSwitch/>,
				999),

		];

		this.loggedInRules = new Set();
		this.roleRules = new Set();
	}

	public withNavTrigger() {
		this.navItems.push(new MenuItem(<a data-target="sidenav" className="sidenav-trigger"><i
				className="material-icons">menu</i></a>,
			1000, [], null, true));
		return this;
	}

	public withLoggedIn(loggedIn: (boolean | null)[]) {
		loggedIn.forEach(val => this.loggedInRules.add(val));
		return this;
	}

	public withRoles(roles: string[]) {
		roles.forEach(val => this.roleRules.add(val));
		return this;
	}

	public build(): JSX.Element[] {
		this.navItems = this.navItems
			.filter(item => {
				const hasRole = item.roles.some(role => this.roleRules.has(role) || this.loggedInRules.size === 0) || item.roles.length === 0;
				const validLoggedIn = this.loggedInRules.has(item.loggedIn);
				return (hasRole && validLoggedIn) || item.special;
			});
		return this.navItems
			.sort((a, b) => MenuBuilder.compareTo(a.order, b.order))
			.map(item => item.element);
	}

	private static compareTo(a: number, b: number) {
		if (a > b)
			return 1;
		else if (a < b)
			return -1;
		else
			return 0;
	}
}

export default MenuBuilder;
