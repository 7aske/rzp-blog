import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthGuard } from "../components/authorization/AuthGuard";
import { RoleGuard } from "../components/authorization/RoleGuard";
import { RegisterPage } from "../pages/register/RegisterPage";
import { AdminIndexPage } from "../pages/roles/admin/adminIndex/AdminIndexPage";
import { LoginPage } from "../pages/login/LoginPage";
import { LogoutPage } from "../pages/login/LogoutPage";
import { CategoryPage } from "../pages/category/CategoryPage";
import { Error404 } from "../pages/errors/Error404";
import { IndexPage } from "../pages/index/IndexPage";
import { PostPage } from "../pages/post/PostPage";
import { UserProfilePage } from "../pages/roles/user/userProfile/UserProfilePage";
import { TagPage } from "../pages/tag/TagPage";
import Roles from "../utils/Roles";
import { UserChangePasswordPage } from "../pages/roles/user/userChangePasswordPage/UserChangePasswordPage";
import { UserPage } from "../pages/user/UserPage";
import { NotificationsPage } from "../pages/notifications/NotificationsPage";

export const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={IndexPage}/>
			<Route exact path="/login" component={LoginPage}/>
			<Route exact path="/404" component={Error404}/>
			<Route path="/posts/:slug" component={PostPage}/>
			<Route path="/users/:username" component={UserPage}/>
			<Route path="/category/:categoryName" component={CategoryPage}/>
			<Route path="/tag/:tagName" component={TagPage}/>
			<Route path="/register" component={RegisterPage}/>
			<AuthGuard>
				<Route exact path="/notifications" component={NotificationsPage}/>
				<Route exact path="/logout" component={LogoutPage}/>
				<RoleGuard roles={[Roles.ADMIN_ROLE, Roles.AUTHOR_ROLE, Roles.USER_ROLE]}>
					<Route path={"/user/profile"} component={UserProfilePage}/>
				</RoleGuard>
				<RoleGuard roles={[Roles.ADMIN_ROLE, Roles.AUTHOR_ROLE]}>
					<Route path="/author" component={AdminIndexPage}/>
				</RoleGuard>
				<RoleGuard roles={[Roles.ADMIN_ROLE]}>
					<Route path="/admin" component={AdminIndexPage}/>
				</RoleGuard>
				<RoleGuard roles={[]}>
					<Route exact path="/user/profile" component={UserChangePasswordPage}/>
				</RoleGuard>
			</AuthGuard>
		</Switch>
	);
};
