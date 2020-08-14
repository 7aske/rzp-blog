import Cookies from "js-cookie";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { MessageList } from "../../../components/messageList/MessageList";
import { AppContext } from "../../../context/AppContext";
import { backendUrl } from "../../../globals";
import authService from "../../../services/authService";
import "./LoginPage.css";
import userService from "../../../services/userService";
import { getHistoryErrors } from "../../../utils/utils";
import jwtDecode from "jwt-decode";

export const LoginPage = () => {
	const history = useHistory();
	const {ctx, setCtx} = useContext(AppContext);
	const [errors, setErrors] = useState<string[]>([]);

	const success = () => {
		setErrors([]);
		const idUser = (jwtDecode(Cookies.get("auth")!) as any).idUser;

		userService.getById(idUser).then(_user => {
			setCtx({...ctx, user:_user})
			if (_user.userRoles.indexOf("admin") !== -1) {
				history.replace("/admin/posts")
			} else if (_user.userRoles.indexOf("user") !== -1) {
				history.replace("/user/profile")
			} else {
				history.replace("/")
			}
		}).catch(err => {
			console.error(err.response);
			setErrors([err.response.data.error])
		})
	};

	const failure = (err:any) => {
		setErrors([err.response.data.error]);
		console.error(err.response);
	};

	const login = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const username = form["username"].value;
		const password = form["password"].value;

		authService.login(username, password)
			.then(success)
			.catch(failure);
	};

	useEffect(() => {
		M.updateTextFields();
		authService.verify().then(success)
		setErrors(getHistoryErrors(history));

		// eslint-disable-next-line
	}, []);

	return (
		<div id="login-page" className="container">
			<form className="col s12" method="post" onSubmit={login} action={backendUrl + "/auth/login"}>
				<div className="row">
					<div className="col s12 m3 l3 xl4"/>
					<div className="input-field col s12 m6 l6 xl4">
						<input placeholder="Username" id="username" type="text"/>
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
