import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthGuard } from "../components/authorization/AuthGuard";
import { RoleGuard } from "../components/authorization/RoleGuard";
import { AdminIndexPage } from "../pages/admin/adminIndex/AdminIndexPage";
import { LoginPage } from "../pages/admin/login/LoginPage";
import { LogoutPage } from "../pages/admin/login/LogoutPage";
import { CategoryPage } from "../pages/category/CategoryPage";
import { Error404 } from "../pages/errors/Error404";
import { IndexPage } from "../pages/index/IndexPage";
import { PostPage } from "../pages/post/PostPage";
import { UserProfilePage } from "../pages/user/userProfile/UserProfilePage";

export const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={IndexPage}/>
			<Route exact path="/login" component={LoginPage}/>
			<Route exact path="/404" component={Error404}/>
			<Route path="/posts/:slug" component={PostPage}/>
			<Route path="/category/:categoryName" component={CategoryPage}/>
			<AuthGuard>
				<Route exact path="/logout" component={LogoutPage}/>
				<RoleGuard roles={["user"]}>
					<Route path={"/user/profile"} component={UserProfilePage}/>
				</RoleGuard>
				<RoleGuard roles={["admin"]}>
					<Route path="/admin" component={AdminIndexPage}/>
				</RoleGuard>
			</AuthGuard>
		</Switch>
	);
};
