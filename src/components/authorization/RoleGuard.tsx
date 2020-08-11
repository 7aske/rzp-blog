import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

type RoleGuardProps = {
	children?: JSX.Element[] | JSX.Element | never[];
	roles: string[]
};
export const RoleGuard = (props: RoleGuardProps) => {
	const history = useHistory();
	const {ctx: {user}} = useContext(AppContext);
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		if (user !== null) {
			const hasRole = user.userRoles.some(role => props.roles.indexOf(role) !== -1);
			setAuthorized(hasRole);
		} else {
			history.push("/login");
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{authorized ? props.children : ""}
		</div>
	);

};
