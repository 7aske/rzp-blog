import * as React from "react";
import { backendUrl } from "../../../globals";
import "./LoginPage.css"

export const LoginPage = () => {
	return (
		<div id="login-page" className="container">
			<form className="col s12"  method="post" action={backendUrl + "/auth/login"}>
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
					</div>
				</div>
				<div className="row">
					<div className="col s12 center">
						<button className="btn waves-effect waves-light" type="submit" name="action">Login
							<i className="material-icons right">send</i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
