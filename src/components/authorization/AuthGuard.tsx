import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import AuthService from "../../services/Auth.service";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { User } from "../../@types/User";
import UserService from "../../services/User.service";
import { AppContext } from "../../context/AppContext";

const authService = new AuthService();
const userService = new UserService();

type AuthGuardProps = {
	children?: JSX.Element[] | JSX.Element | never[];
};
export const AuthGuard = (props: AuthGuardProps) => {
	const history = useHistory();
	const {ctx, setCtx} = useContext(AppContext);
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		const auth = Cookies.get("auth");
		if (auth) {
			const token = jwtDecode<{ sub: string, iat: number, exp: number, roles: string[] }>(auth);
			if (new Date().valueOf() >= token.exp * 1000) {
				refresh();
			} else {
				setAuthorized(true);
			}
		} else {
			refresh();
		}

		// eslint-disable-next-line
	}, [history.location]);

	const refresh = () => {
		authService.refresh()
			.then((token: any) => {
				(async () => {
					try {
						const res = await userService.getByUsername(token.user);
						const user: User = res.data as User;
						user.roles = (token.roles as string[]).map(role => ({name: role}));
						setCtx({...ctx, user: user});
					} catch (e) {
					}
				})();
			})
			.catch(() => {
				setAuthorized(false);
				history.replace({
					pathname: "/login",
					state: {error: "auth.session.expired"},
				});
			});
	};

	return (
		<div>
			{authorized ? props.children : undefined}
		</div>
	);
};
