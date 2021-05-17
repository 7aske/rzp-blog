import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MaterializeInput from "../../components/materialize/input/MaterializeInput";
import { MessageList } from "../../components/messageList/MessageList";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import { getErrorText } from "../errors/localization";
import localization from "./localization";
import "./RegisterPage.scss";
import UserService from "../../services/User.service";
import { RegisterUserDto } from "../../api/api";

const userService = new UserService();

type RegisterPageProps = {};
export const RegisterPage = (props: RegisterPageProps) => {
	const history = useHistory();
	const [locale] = useLocale();
	const [user, setUser] = useState<RegisterUserDto>({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		confirm: "",
		username: "",
	});

	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...user, [ev.target.id]: ev.target.value});
	};

	const register = () => {
		userService.register(user)
			.then(() => {
				setMessages([localization[locale].successText]);
				setTimeout(() => history.replace("/login"), 3000);
			})
			.catch(err => {
				if (err.response && err.response.data) {
					setErrors([err.response.data.error]);
				} else {
					setErrors([getErrorText("generic", locale)]);
				}
			});
	};

	return (
		<div id="register-page" className="container">
			<div className="row">
				<h2 className="theme-green-text title">{localization[locale].registerTitle}</h2>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<MaterializeInput label={localization[locale].userUsernameLabel}
					                  className="col s12 m12 l6 xl4"
					                  value={user?.username}
					                  id="username"
					                  onChange={updateProp}/>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<MaterializeInput label={localization[locale].userPasswordLabel}
					                  value={user?.password}
					                  id="password"
					                  type="password"
					                  className="col s12 m12 l6 xl4"
					                  onChange={updateProp}/>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<MaterializeInput label={localization[locale].userConfirmLabel}
					                  value={user?.confirm}
					                  id="confirm"
					                  type="password"
					                  className="col s12 m12 l6 xl4"
					                  onChange={updateProp}/>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<MaterializeInput label={localization[locale].userEmailLabel}
					                  value={user?.email}
					                  id="email"
					                  className="col s12 m12 l6 xl4"
					                  onChange={updateProp}/>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<MaterializeInput label={localization[locale].userFirstNameLabel}
					                  value={user?.firstName}
					                  id="firstName"
					                  className="col s12 m12 l6 xl4"
					                  onChange={updateProp}/>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<MaterializeInput label={localization[locale].userLastNameLabel}
					                  value={user?.lastName}
					                  id="lastName"
					                  className="col s12 m12 l6 xl4"
					                  onChange={updateProp}/>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<div className="col s12 m12 l6 xl4">
						<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
						<MessageList className="green accent-2 white-text" messages={messages}/>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m12 l3 xl4"/>
					<div className="col s12">
						<button onClick={register} className="btn"
						        name="action">{localization[locale].registerButton}
							<i className="material-icons right">send</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
