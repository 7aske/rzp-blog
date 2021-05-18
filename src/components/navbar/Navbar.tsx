import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Route } from "react-router";
import "../../assets/img/logo.png";
import { Link } from "react-router-dom";
// @ts-ignore
import logo from "../../assets/img/logo.png";
import { AppContext } from "../../context/AppContext";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import MenuBuilder from "./MenuBuilder";
import "./Navbar.scss";
import { Sidenav } from "./sidenav/Sidenav";
import Roles from "../../utils/Roles";
import AuthService from "../../services/Auth.service";
import { User } from "../../@types/User";
import UserService from "../../services/User.service";

const authService = new AuthService();
const userService = new UserService();

export const Navbar = () => {
	const [locale] = useLocale();
	const {ctx, setCtx} = useContext(AppContext);

	const [navRef, setNavRef] = useState<HTMLElement | null>(null);
	const [progRef, setProgRef] = useState<HTMLDivElement | null>(null);

	const loggedIn = ctx.user !== null;

	const roles = ctx.user ? ctx.user.roles : [];
	Console.log(roles);


	const navItems = new MenuBuilder(locale)
		.withLoggedIn([loggedIn, null])
		.withRoles([Roles.USER_ROLE])
		.withRoles(ctx.user?.roles.find(r => r.name === Roles.USER_ROLE) ? [Roles.AUTHOR_ROLE] : [])
		.withNavTrigger()
		.build();

	const sidenavItems = new MenuBuilder(locale)
		.withLoggedIn([loggedIn, null])
		.withRoles(roles.map(r => r.name!))
		.build();

	const mobileNav = new MenuBuilder(locale)
		.withNavTrigger()
		.build();

	const onScroll = () => {
		const {scrollY} = window;
		const offset = parseFloat(getComputedStyle(document.body, null).fontSize) * 3;

		if (navRef) {
			if (scrollY > navRef.offsetHeight + offset) {
				navRef.classList.add("fixed");
			} else {
				navRef.classList.remove("fixed");
			}
		}

		if (progRef) {
			const {innerHeight} = window;
			const {innerWidth} = window;
			const height = document.body.offsetHeight - innerHeight;

			progRef.style.width = `${Number(innerWidth * (scrollY / height))}px`;
		}
	};

	const success = (token: any) => {
		(async () => {
			try {
				const res = await userService.getByUsername(token.user);
				const user: User = res.data as User;
				user.roles = (token.roles as string[]).map(role => ({name: role}));
				setCtx({...ctx, user: user});
			} catch (e) {
			}
		})();
	};

	useEffect(() => {
		authService.verify()
			.then(success)
			.catch(() => void false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll);
		// eslint-disable-next-line
	}, [progRef, navRef]);

	return (
		<nav ref={elem => setNavRef(elem)} id="nav">
			<div className="spacer"/>
			<div className="menu container">

				<Link to="/" className="nav-logo"><img src={logo} alt="Logo"/></Link>
				<ul className="menu right hide-on-large-only">
					{mobileNav.map((item, i) => <li key={i}>{item}</li>)}
				</ul>
				<ul className="menu right hide-on-med-and-down">
					{navItems.map((item, i) => <li key={i}>{item}</li>)}
				</ul>
			</div>
			<Sidenav menuItems={sidenavItems}/>
			<Route path="/posts/*">
				<div ref={elem => setProgRef(elem)} className="prog"/>
			</Route>
		</nav>);
};
