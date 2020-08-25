import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MaterializeInput from "../../components/materialize/input/MaterializeInput";
import { MessageList } from "../../components/messageList/MessageList";
import useLocale from "../../hooks/useLocale";
import userService from "../../services/userService";
import Console from "../../utils/Console";
import { getErrorText } from "../errors/localization";
import localization from "./localization";
import "./RegisterPage.css";

type RegisterPageProps = {};
export const RegisterPage = (props: RegisterPageProps) => {
	const history = useHistory();
	const [locale] = useLocale();
	const [user, setUser] = useState<User>({
		idUser: 0,
		userAbout: "",
		userActive: true,
		userAddress: "",
		userDateCreated: "",
		userDisplayName: "",
		userEmail: "",
		userFirstName: "",
		userLastName: "",
		userPassword: "",
		userRoles: [],
		userUsername: "",
	});

	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...user, [ev.target.id]: ev.target.value});
	};

	useEffect(() => {
		Console.log(user);
	}, [user]);

	const register = () => {
		let action = userService.register;

		action(user).then(() => {
			setMessages([localization[locale].successText]);
			setTimeout(() => history.replace("/login"), 3000);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
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
							<div className="col l4"/>
							<MaterializeInput label={localization[locale].userUsernameLabel}
							                  className="col s12 m12 l4"
							                  value={user?.userUsername}
							                  id="userUsername"
							                  onChange={updateProp}/>
						</div>
						<div className="row">
							<div className="col l4"/>
							<MaterializeInput label={localization[locale].userUsernameLabel}
							                  value={user?.userPassword}
							                  id="userPassword"
							                  type="password"
							                  className="col s12 m12 l4"
							                  onChange={updateProp}/>
						</div>
						<div className="row">
							<div className="col l4"/>
							<MaterializeInput label={localization[locale].userDisplayNameLabel}
							                  value={user?.userDisplayName}
							                  id="userDisplayName"
							                  className="col s12 m12 l4"
							                  onChange={updateProp}/>
						</div>
						<div className="row">
							<div className="col l4"/>
							<MaterializeInput label={localization[locale].userEmailLabel}
							                  value={user?.userEmail}
							                  id="userEmail"
							                  className="col s12 m12 l4"
							                  onChange={updateProp}/>
						</div>
						<div className="row">
							<div className="col l4"/>
							<MaterializeInput label={localization[locale].userFirstNameLabel}
							                  value={user?.userFirstName}
							                  id="userFirstName"
							                  className="col s12 m12 l4"
							                  onChange={updateProp}/>
						</div>
						<div className="row">
							<div className="col l4"/>
							<MaterializeInput label={localization[locale].userLastNameLabel}
							                  value={user?.userLastName}
							                  id="userLastName"
							                  className="col s12 m12 l4"
							                  onChange={updateProp}/>
						</div>
						<div className="row">
							<div className="col l4"/>
							<div className="col s12 m12 l4">
								<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
								<MessageList className="green accent-2 white-text" messages={messages}/>
							</div>
						</div>
						<div className="row">
							<div className="col l4"/>
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
