import { useContext } from "react";
import * as React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { CategoryEdit } from "../../../../components/roles/categoryEdit/CategoryEdit";
import { PostEdit } from "../../../../components/roles/postEdit/PostEdit";
import { PostView } from "../../../../components/roles/postView/PostView";
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import { TagEdit } from "../../../../components/roles/tagEdit/TagEdit";
import { hasRole } from "../../../../utils/utils";
import localization from "./localization";
import "./AdminIndexPage.css";

type AdminIndexPageProps = {};
export const AdminIndexPage = (props: AdminIndexPageProps) => {
	const {ctx} = useContext(AppContext);
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
	if (!hasRole(ctx.user?.userRoles!, "admin")) menuItems.pop();
	return (
		<div id="admin-index-page" className="white-text">
				<div className="row">
					<div className="col s12 m12 l2 xl2">
						<Sidebar items={menuItems}/>
					</div>
					<div className="col s12 m12 l10 xl10 container">
						<Switch>
							<Route exact path="/admin/posts">
								<PostView />
							</Route>
							<Route exact path="/admin/categories">
								<CategoryEdit roles={ctx.user?.userRoles || []} />
							</Route>
							<Route exact path="/admin/tags">
								<TagEdit roles={ctx.user?.userRoles || []}/>
							</Route>
							<Route exact path="/admin/authors">
								Authors
							</Route>
							<Route exact path="/admin/posts/edit">
								<PostEdit roles={ctx.user?.userRoles || []}/>
							</Route>
							<Route path="/admin/posts/edit/:postSlug">
								<PostEdit roles={ctx.user?.userRoles || []}/>
							</Route>
						</Switch>
					</div>
				</div>
		</div>

	);
};