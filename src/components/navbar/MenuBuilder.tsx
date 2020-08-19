import React from "react";
import { Link } from "react-router-dom";
import { websiteUrl } from "../../globals";
import routes from "../../router/localization";
import { LocaleSwitch } from "../localization/LocaleSwitch";
import MenuItem from "./MenuItem";

class MenuBuilder {
	private navItems: MenuItem[];

	private loggedInRules: Set<boolean | null>;
	private roleRules: Set<string>;

	private locale: string;

	constructor(locale: string) {
		this.locale = locale;

		this.navItems = [
			// navigation
			new MenuItem(<Link className="sidenav-close" to="/">{routes[this.locale].home}</Link>,
				0, [], null),
			new MenuItem(<a target="blank" href={websiteUrl}>{routes[this.locale].website}</a>,
				1, [], null),
			// navigation end
			// user
			new MenuItem(<Link className="sidenav-close" to="/user/profile">{routes[locale].profile}</Link>,
				20, ["user"], true),
			// user end
			// admin
			new MenuItem(<Link className="sidenav-close" to="/admin/posts">{routes[locale].posts}</Link>,
				100, ["author", "admin"], true),
			// admin end
			// auth
			new MenuItem(<Link className="sidenav-close" to="/login">{routes[this.locale].login}</Link>,
				900, [], false),
			new MenuItem(<Link className="sidenav-close" to="/logout">{routes[this.locale].logout}</Link>,
				900, [], true),
			// auth
			new MenuItem(<LocaleSwitch/>,
				999, [], null),

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
