import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MessageList } from "../../components/messageList/MessageList";
import { AppContext } from "../../context/AppContext";
import useLocale from "../../hooks/useLocale";
import { getHistoryErrors, hasRole } from "../../utils/utils";
import { getErrorText } from "../errors/localization";
import "./LoginPage.scss";
import UserService from "../../services/User.service";
import AuthService from "../../services/Auth.service";
import { User } from "../../@types/User";
import Roles from "../../utils/Roles";

const userService = new UserService();
const authService = new AuthService();

export const LoginPage = () => {
	const [locale] = useLocale();
	const history = useHistory();
	const {ctx, setCtx} = useContext(AppContext);
	const [errors, setErrors] = useState<string[]>([]);

	const postLogin = (user: User) => {
		if (hasRole(user!.roles.map(r => r.name!), Roles.ADMIN_ROLE)) {
			history.replace("/author/posts");
		} else if (hasRole(user!.roles.map(r => r.name!), Roles.USER_ROLE)) {
			history.replace("/user/profile");
		} else {
			history.replace("/");
		}
	};

	const success = (token: any) => {
		(async () => {
			setErrors([]);
			try {
				const res = await userService.getByUsername(token.user);
				const user: User = res.data as User;
				user.roles = (token.roles as string[]).map(role => ({name: role}));
				setCtx({...ctx, user: user});
				postLogin(user);
			} catch (e) {
				failure(e);
			}
		})();
	};

	const failure = (err: any) => {
		if (err.response && err.response.data.error) {
			setErrors([err.response.data.error]);
		} else {
			setErrors([getErrorText("generic", locale)]);
		}
		console.dir(err);
	};

	const login = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const username = form["username"].value;
		const password = form["password"].value;

		authService.login({username, password})
			.then(success)
			.catch(failure);
	};

	useEffect(() => {
		M.updateTextFields();
		authService.verify()
			.then(success)
			.catch(() => void false);
		setErrors(getHistoryErrors(history));

		// eslint-disable-next-line
	}, []);

	return (
		<div id="login-page" className="container">
			<form className="col s12" method="post" onSubmit={login}>
				<div className="row">
					<div className="col s12 m3 l3 xl4"/>
					<div className="input-field col s12 m6 l6 xl4">
						<input placeholder="Username" id="username" type="text" autoFocus={true}/>
						<label htmlFor="username">Username</label>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m3 l3 xl4"/>
					<div className="input-field col s12 m6 l6 xl4">
						<input placeholder="Password" id="password" type="password"/>
						<label htmlFor="password">Password</label>
						<MessageList className="red accent-2 white-text" timeout={3000} messages={errors}/>
					</div>
				</div>
				<div className="row">
					<div className="col s12 center">
						<button className="btn btn-theme waves-effect waves-light" type="submit" name="action">Login
							<i className="material-icons right">send</i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
