import * as React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { AdminCategoryList } from "./adminCategoryList/AdminCategoryList";
import { AdminPostEdit } from "./adminPostEdit/AdminPostEdit";
import { AdminPostList } from "./adminPostList/AdminPostList";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import useLocale from "../../../hooks/useLocale";
import { AdminTagList } from "./adminTagList/AdminTagList";
import localization from "./localization";
import "./AdminIndexPage.css";

type AdminIndexPageProps = {};
export const AdminIndexPage = (props: AdminIndexPageProps) => {

	const [locale] = useLocale();
	const menuItems = [
		<NavLink activeClassName="active" className="btn btn-flat" to="/admin/posts"><i
			className="material-icons left hide-on-small-and-down">library_books</i>{localization[locale].sidebarPosts}</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/admin/categories"><i
			className="material-icons left hide-on-small-and-down">label</i>{localization[locale].sidebarCategories}</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/admin/tags"><i
			className="material-icons left hide-on-small-and-down">local_offer</i>{localization[locale].sidebarTags}</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/admin/authors"><i
			className="material-icons left hide-on-small-and-down">people</i>{localization[locale].sidebarAuthors}</NavLink>,
	];
	return (
		<div id="admin-index-page" className="white-text">
				<div className="row">
					<div className="col s12 m12 l2 xl2">
						<Sidebar items={menuItems}/>
					</div>
					<div className="col s12 m12 l10 xl10 container">
						<Switch>
							<Route exact path="/admin/posts">
								<AdminPostList/>
							</Route>
							<Route exact path="/admin/categories">
								<AdminCategoryList/>
							</Route>
							<Route exact path="/admin/tags">
								<AdminTagList/>
							</Route>
							<Route exact path="/admin/authors">
								Authors
							</Route>
							<Route exact path="/admin/posts/edit">
								<AdminPostEdit/>
							</Route>
							<Route path="/admin/posts/edit/:postSlug">
								<AdminPostEdit/>
							</Route>
						</Switch>
					</div>
				</div>
		</div>

	);
};
