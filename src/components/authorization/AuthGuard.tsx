import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import authService from "../../services/authService";

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
			console.error(err.response);
			history.replace({
				pathname: "/login",
				state: {error: err.response.data.error},
			});
		});

		// eslint-disable-next-line
	}, []);

	return (
		<div>
			{authorized ? props.children : ""}
		</div>
	);
};
