import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Console from "../../utils/Console";
import AuthService from "../../services/Auth.service";

const authService = new AuthService();

type AuthGuardProps = {
	children?: JSX.Element[] | JSX.Element | never[];
};
export const AuthGuard = (props: AuthGuardProps) => {
	const history = useHistory();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		authService.verify().then(() => {
			setAuthorized(true);
		}).catch(err => {
			if (err.response)
				history.replace({
					pathname: "/login",
					state: {error: err.response.data.error},
				});
			else
				history.replace("/");
		});

		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{authorized ? props.children : ""}
		</div>
	);
};
