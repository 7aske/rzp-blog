import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";
import { hasRole } from "../../utils/utils";

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
			const has = user.roles.some(role => hasRole(props.roles, role.name!));
			setAuthorized(has);
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
