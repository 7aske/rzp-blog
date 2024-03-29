import * as React from "react";
import { useContext } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { CategoryEdit } from "../../../../components/roles/categoryEdit/CategoryEdit";
import { PostEdit } from "../../../../components/roles/postEdit/PostEdit";
import { PostView } from "../../../../components/roles/postView/PostView";
import { TagEdit } from "../../../../components/roles/tagEdit/TagEdit";
import { UserEdit } from "../../../../components/roles/userEdit/UserEdit";
import { UserView } from "../../../../components/roles/userView/UserView";
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import { hasRole } from "../../../../utils/utils";
import { UserProfilePage } from "../../user/userProfile/UserProfilePage";
import "./AdminIndexPage.scss";
import localization from "./localization";
import Roles from "../../../../utils/Roles";
import { MediaView } from "../../../../components/roles/mediaView/MediaView";

export const AdminIndexPage = () => {
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();

	const menuItems = [
		<NavLink activeClassName="active" className="btn btn-flat" to="/author/posts"><i
			className="material-icons left">library_books</i><span className="hide-on-small-and-down">{localization[locale].sidebarPosts}</span>
		</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/author/media"><i
			className="material-icons left">people</i><span className="hide-on-small-and-down">{localization[locale].sidebarMedia}</span>
		</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/author/categories"><i
			className="material-icons left">label</i><span className="hide-on-small-and-down">{localization[locale].sidebarCategories}</span>
		</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/author/tags"><i
			className="material-icons left">local_offer</i><span className="hide-on-small-and-down">{localization[locale].sidebarTags}</span>
		</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/admin/users"><i
			className="material-icons left">people</i><span
			className="hide-on-small-and-down">{localization[locale].sidebarAuthors}</span>
		</NavLink>,
	];

	if (!hasRole(ctx.user?.roles!, Roles.ADMIN_ROLE)) menuItems.pop();
	return (
		<div id="admin-index-page" className="white-text">
			<div className="row">
				<div className="col s12 m12 l2 xl2">
					<Sidebar items={menuItems}/>
				</div>
				<div className="col s12 m12 l10 xl10 container">
					<Switch>
						<Route exact path="/author/posts">
							<PostView/>
						</Route>
						<Route exact path="/author/categories">
							<CategoryEdit/>
						</Route>
						<Route exact path="/author/tags">
							<TagEdit/>
						</Route>
						<Route exact path="/author/posts/edit">
							<PostEdit/>
						</Route>
						<Route path="/author/posts/edit/:postSlug">
							<PostEdit/>
						</Route>
						<Route exact path="/author/media">
							<MediaView/>
						</Route>
						<Route exact path="/admin/users">
							<UserView/>
						</Route>
						<Route exact path="/admin/users/edit">
							<UserEdit/>
						</Route>
						<Route path="/admin/users/edit/:idUser">
							<UserEdit/>
						</Route>
						<Route>
							<UserProfilePage/>
						</Route>
					</Switch>
				</div>
			</div>
		</div>

	);
};
