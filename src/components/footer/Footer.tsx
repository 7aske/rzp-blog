import * as React from "react";
import { Link } from "react-router-dom";
import { websiteUrl } from "../../globals";
import useLocale from "../../hooks/useLocale";
import routes from "../../router/localization";
import "./Footer.css";
import { scrollToTop } from "../../utils/utils";
import localization from "./localization";

export const Footer = () => {
	const [locale] = useLocale();

	const menuItems = [
		<li key={0}><a href={websiteUrl}>{routes[locale].home}</a></li>,
		<li key={1}><a href={websiteUrl + "/#/about"}>{routes[locale].about}</a></li>,
		<li key={2}><a href={websiteUrl + "/#/team"}>{routes[locale].team}</a></li>,
		<li key={3}><a href={websiteUrl + "/#/contact"}>{routes[locale].contact}</a></li>,
		<li key={4}><Link to="/">{routes[locale].blog}</Link></li>,
	];

	return (
		<footer id="footer" className="page-footer">
			<div className="container to-top">
				<a className="grey-text text-lighten-4 right" href="#"
				   onClick={scrollToTop}>{localization[locale].toTop}</a>
			</div>
			<div className="container footer-content">
				<div className="row">
					<div className="col l6 s12">
						<h5>{localization[locale].company}</h5>
						<p>{localization[locale].text}</p>
					</div>

					<div className="col l4 offset-l2 s12 resources">
						<h5 className="white-text">{localization[locale].resources}</h5>
						<ul>
							{menuItems}
						</ul>
					</div>

				</div>
			</div>

			<div className="footer-copyright">
				<div className="container">
					{localization[locale].copyright}
				</div>
			</div>

		</footer>
	);
};
