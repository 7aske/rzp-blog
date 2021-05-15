import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { PasswordChangeInput } from "../../../../components/propertyUpdateInput/PasswordChangeInput";
import { PropertyUpdateInput } from "../../../../components/propertyUpdateInput/PropertyUpdateInput";
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import Console from "../../../../utils/Console";
import localization from "./localization";
import "./UserProfilePage.scss";
import { User } from "../../../../@types/User";
import { UserInfoPage } from "../userInfo/UserInfoPage";

type UserProfilePageProps = {};
export const UserProfilePage = (props: UserProfilePageProps) => {
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();
	const [user, setUser] = useState<User | null>();

	useEffect(() => {
		setUser(ctx.user);
		// eslint-disable-next-line
	}, [ctx.user]);
	useEffect(() => {
		M.updateTextFields();
		Console.log(user);
	}, [user, ctx.user]);

	const menuItems = [
		<NavLink activeClassName="active" className="btn btn-flat" to="/user/profile/info"><i
			className="material-icons left hide-on-small-and-down">info</i>{localization[locale].sidebarInfo}</NavLink>,
		<NavLink activeClassName="active" className="btn btn-flat" to="/user/profile/security"><i
			className="material-icons left hide-on-small-and-down">lock</i>{localization[locale].sidebarSecurity}
		</NavLink>,
	];

	const infoProps: { element?: string, prop: string, className: string, disabled?: boolean }[] = [
		{prop: "username", className: "col s12 m12 l8", disabled: true},
		{prop: "displayName", className: "col s12 m12 l8"},
		{prop: "email", className: "col s12 m12 l8"},
		{prop: "firstName", className: "col s12 m12 l6"},
		{prop: "lastName", className: "col s12 m12 l6"},
		{prop: "about", className: "col s12 m12", element: "textarea"},
	];

	return (
		<div id="user-profile-page" className="container white-text">
			<div className="row">
				<h2 className="title">{localization[locale].title}</h2>
			</div>
			<div className="row">
				<div className="col s12 m12 l4 xl3">
					<Sidebar items={menuItems}/>
				</div>
				<div className="col s12 m12 l8 xl9">
					<Switch>
						<Route exact path={"/user/profile/info"}>
							<UserInfoPage/>
						</Route>
						<Route exact path={"/user/profile/security"}>
							<div className="row">
								<div className="col s12 m12 l8">
									<PasswordChangeInput locale={locale}/>
								</div>
							</div>
						</Route>
						<Route>
							<Redirect to={"/user/profile/info"}/>
						</Route>
					</Switch>
				</div>
			</div>
		</div>
	);
};
