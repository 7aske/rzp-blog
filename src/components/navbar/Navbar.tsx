import * as React from "react";
import { createRef, useContext, useEffect } from "react";
import "../../assets/img/logo.png";
// @ts-ignore
import logo from "../../assets/img/logo.png";
import { AppContext } from "../../context/AppContext";
import useLocale from "../../hooks/useLocale";
import MenuBuilder from "./MenuBuilder";
import "./Navbar.css";
import { Sidenav } from "./sidenav/Sidenav";


export const Navbar = () => {
	const [locale] = useLocale();
	const {ctx} = useContext(AppContext);

	const navRef = createRef<HTMLElement>();

	const loggedIn = ctx.user !== null;

	const roles = ctx.user ? ctx.user.userRoles.map(role => role.roleName) : [];
	console.log(roles);

	const navItems = new MenuBuilder(locale)
		.withLoggedIn([loggedIn, null])
		.withNavTrigger()
		.build();

	const sidenavItems = new MenuBuilder(locale)
		.withLoggedIn([loggedIn, null])
		.withRoles(roles)
		.build();

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (!navRef.current) return;

			const scroll = window.scrollY;
			const offset = parseFloat(getComputedStyle(document.body, null).fontSize) * 3;

			if (scroll > navRef.current!.offsetHeight + offset) {
				navRef.current.classList.add("fixed");
			} else if (scroll <= offset) {
				navRef.current.classList.remove("fixed");
			}
		});
		// eslint-disable-next-line
	}, []);

	return (
		<nav ref={navRef} id="nav">
			<div className="spacer"/>
			<div className="menu container">

				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className="nav-logo"><img src={logo} alt="Logo"/></a>
				<ul className="menu right hide-on-med-and-down">
					{navItems}
				</ul>
			</div>
			<Sidenav menuItems={sidenavItems}/>
		</nav>);
};
