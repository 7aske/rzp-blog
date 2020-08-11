import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthGuard } from "../components/authentication/AuthGuard";
import { AdminIndexPage } from "../pages/admin/adminIndex/AdminIndexPage";
import { LoginPage } from "../pages/admin/login/LoginPage";
import { Error404 } from "../pages/errors/Error404";
import { IndexPage } from "../pages/index/IndexPage";
import { PostPage } from "../pages/post/PostPage";

export const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={IndexPage}/>
			<Route exact path="/login" component={LoginPage}/>
			<Route exact path="/404" component={Error404}/>
			<AuthGuard>
				<Route exact path="/admin" component={AdminIndexPage}/>
			</AuthGuard>
			<Route path="/:slug" component={PostPage}/>
		</Switch>
	);
};
