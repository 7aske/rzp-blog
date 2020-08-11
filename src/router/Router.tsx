import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "../pages/admin/login/LoginPage";
import { Error404 } from "../pages/errors/Error404";
import { IndexPage } from "../pages/index/IndexPage";
import { PostPage } from "../pages/post/PostPage";

export const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={IndexPage} />
			<Route exact path="/admin/login" component={LoginPage} />
			<Route exact path="/404" component={Error404} />
			<Route path="/:slug" component={PostPage} />
		</Switch>
	);
};
