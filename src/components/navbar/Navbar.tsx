import * as React from "react";
import { createRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/img/logo.png";
// @ts-ignore
import logo from "../../assets/img/logo.png";
import { AppContext } from "../../context/AppContext";
import { websiteUrl } from "../../globals";
import useLocale from "../../hooks/useLocale";
import routes from "../../router/localization";
import { LocaleSwitch } from "../localization/LocaleSwitch";
import "./Navbar.css";
import { Sidenav } from "./sidenav/Sidenav";


export const Navbar = () => {
	const [locale] = useLocale();
	const {ctx} = useContext(AppContext);

	const navRef = createRef<HTMLElement>();

	const menuItems = [
		<li key={0}><Link className="sidenav-close" to="/">{routes[locale].home}</Link></li>,
		<li key={1}><a href={websiteUrl + "/#/about"}>{routes[locale].about}</a></li>,
		<li key={2}><a href={websiteUrl + "/#/team"}>{routes[locale].team}</a></li>,
		<li key={3}><a href={websiteUrl + "/#/contact"}>{routes[locale].contact}</a></li>,
		<li key={4}><a target="blank" href={websiteUrl}>{routes[locale].website}</a></li>,
		<li key={5}><LocaleSwitch/></li>,
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
		console.log(ctx);
		// eslint-disable-next-line
	}, []);

	return (
		<nav ref={navRef} id="nav">
			<div className="spacer"/>
			<div className="menu container">

				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a className="nav-logo"><img src={logo} alt="Logo"/></a>
				<ul className="menu right hide-on-med-and-down">
					{menuItems}
				</ul>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a data-target="sidenav" className="sidenav-trigger right"><i
					className="material-icons">menu</i></a>
			</div>
			<Sidenav menuItems={menuItems}/>

		</nav>);
};
