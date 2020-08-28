import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Route } from "react-router";
import "../../assets/img/logo.png";
// @ts-ignore
import logo from "../../assets/img/logo.png";
import { AppContext } from "../../context/AppContext";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import MenuBuilder from "./MenuBuilder";
import "./Navbar.css";
import { Sidenav } from "./sidenav/Sidenav";


export const Navbar = () => {
	const [locale] = useLocale();
	const {ctx} = useContext(AppContext);

	const [navRef, setNavRef] = useState<HTMLElement | null>(null);
	const [progRef, setProgRef] = useState<HTMLDivElement | null>(null);

	const loggedIn = ctx.user !== null;

	const roles = ctx.user ? ctx.user.userRoles : [];
	Console.log(roles);


	const navItems = new MenuBuilder(locale)
		.withLoggedIn([loggedIn, null])
		.withRoles(["user"])
		.withNavTrigger()
		.build();

	const sidenavItems = new MenuBuilder(locale)
		.withLoggedIn([loggedIn, null])
		.withRoles(roles)
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
	}

	useEffect(() => {
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll);
		// eslint-disable-next-line
	}, [progRef, navRef]);

	return (
		<nav ref={elem => setNavRef(elem)} id="nav">
			<div className="spacer"/>
			<div className="menu container">

				<a className="nav-logo"><img src={logo} alt="Logo"/></a>
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
