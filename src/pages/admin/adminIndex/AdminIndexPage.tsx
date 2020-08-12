import * as React from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { AdminPostList } from "./adminPostList/AdminPostList";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import useLocale from "../../../hooks/useLocale";
import localization from "./localization";
import "./AdminIndexPage.css";

type AdminIndexPageProps = {};
export const AdminIndexPage = (props: AdminIndexPageProps) => {

	const [locale] = useLocale();
	const menuItems = [
		<Link className="btn btn-flat" to="/admin/posts"><i
			className="material-icons">library_books</i>{localization[locale].sidebarPosts}</Link>,
		<Link className="btn btn-flat" to="/admin/categories"><i
			className="material-icons">label</i>{localization[locale].sidebarCategories}</Link>,
		<Link className="btn btn-flat" to="/admin/tags"><i
			className="material-icons">local_offer</i>{localization[locale].sidebarTags}</Link>,
		<Link className="btn btn-flat" to="/admin/authors"><i
			className="material-icons">people</i>{localization[locale].sidebarAuthors}</Link>,
	];
	return (
		<div id="admin-index-page" className="white-text">
				<div className="row">
					<div className="col s12 m2 l2 xl2 hide-on-med-and-down">
						<Sidebar items={menuItems}/>
					</div>
					<div className="col s12 m10 l10 xl10">
						<Switch>
							<Route exact path="/admin/posts">
								<AdminPostList/>
							</Route>
							<Route exact path="/admin/categories">
								Categories
							</Route>
							<Route exact path="/admin/tags">
								Tags
							</Route>
							<Route exact path="/admin/authors">
								Authors
							</Route>
						</Switch>
					</div>
				</div>
		</div>

	);
};
