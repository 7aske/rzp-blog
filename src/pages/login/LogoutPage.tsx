import Cookies from "js-cookie";
import * as React from "react";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

type LogoutPageProps = {};
export const LogoutPage = (props: LogoutPageProps) => {
	const history = useHistory();
	const {ctx, setCtx} = useContext(AppContext);
	useEffect(() => {
		Cookies.remove("auth" );
		history.replace("/login");
		setCtx({...ctx, user: null});
		// eslint-disable-next-line
	}, []);
	return (
		<div className="container white-text">
			Logout
		</div>
	);
};
