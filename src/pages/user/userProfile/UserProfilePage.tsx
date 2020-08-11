import { useContext } from "react";
import * as React from "react";
import "./UserProfilePage.css";
import { AppContext } from "../../../context/AppContext";

type UserProfilePageProps = {

};
export const UserProfilePage = (props: UserProfilePageProps) => {
	const {ctx} = useContext(AppContext);
	return (
		<div id="user-profile-page" className="container white-text">
			<h4>username: {ctx.user?.userUsername}</h4>
			<h4>firstName: {ctx.user?.userFirstName}</h4>
			<h4>lastName: {ctx.user?.userLastName}</h4>
			<h4>displayName: {ctx.user?.userDisplayName}</h4>
		</div>
	);
};
