import * as React from "react";
import { createRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/img/logo.png";
// @ts-ignore
import logo from "../../assets/img/logo.png";
import { websiteUrl } from "../../globals";
import useLocale from "../../hooks/useLocale";
import routes from "../../router/localization";
import { LocaleSwitch } from "../localization/LocaleSwitch";
import "./Navbar.css";
import { Sidenav } from "./sidenav/Sidenav";


export const Navbar = () => {
	const [locale] = useLocale();

	const navRef = createRef<HTMLElement>();

	const menuItems = [
		<li><Link className="sidenav-close" to="/">{routes[locale].home}</Link></li>,
		<li><a href={websiteUrl + "/#/about"}>{routes[locale].about}</a></li>,
		<li><a href={websiteUrl + "/#/team"}>{routes[locale].team}</a></li>,
		<li><a href={websiteUrl + "/#/contact"}>{routes[locale].contact}</a></li>,
		<li><a target="blank" href={websiteUrl}>{routes[locale].website}</a></li>,
		<li><LocaleSwitch/></li>,
	];

	useEffect(() => {
		window.addEventListener("scroll", () => {
			const scroll = window.scrollY;
			if (!navRef.current)
				return;
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

				<a href="#" className="nav-logo"><img src={logo} alt="Logo"/></a>
				<ul className="menu right hide-on-med-and-down">
					{menuItems}
				</ul>
				<a href="#" data-target="sidenav" className="sidenav-trigger right"><i
					className="material-icons">menu</i></a>
			</div>
			<Sidenav menuItems={menuItems}/>

		</nav>);
};
