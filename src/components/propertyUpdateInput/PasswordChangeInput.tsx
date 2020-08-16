import * as React from "react";
import { useEffect, useState } from "react";
import { getErrorText } from "../../pages/errors/localization";
import userUserService from "../../services/modules/user/userUserService";
import Console from "../../utils/Console";
import { MessageList } from "../messageList/MessageList";
import localization from "./localization";

type PasswordChangeInputProps = {
	locale?: string;
};
export const PasswordChangeInput = (props: PasswordChangeInputProps) => {
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	const updatePassword = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const password = form["password"].value;
		const confirmPassword = form["confirmPassword"].value;
		const newPassword = form["newPassword"].value;

		userUserService.updatePassword(password, confirmPassword, newPassword).then(() => {
			setMessages([localization[props.locale || "en"].success]);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, props.locale || "en")]);
			}
		});

	};

	useEffect(() => {
		M.updateTextFields();
	}, []);

	return (
		<form className="row" onSubmit={updatePassword}>
			<div className="input-field col s12">
				<input id="password" type="password"/>
				<label htmlFor="password">{localization[props.locale || "en"].password}</label>
			</div>
			<div className="input-field col s12">
				<input id="confirmPassword" type="password"/>
				<label htmlFor="confirmPassword">{localization[props.locale || "en"].confirmPassword}</label>
			</div>
			<div className="input-field col s12">
				<input id="newPassword" type="password"/>
				<label htmlFor="newPassword">{localization[props.locale || "en"].newPassword}</label>
			</div>
			<div className="row">
				<button type="submit" className="btn theme-green">{localization[props.locale || "en"].update}</button>
			</div>
			<div className="row">
				<MessageList messages={messages} timeout={3000} className={"green accent-2"}/>
				<MessageList messages={errors} timeout={3000} className={"red accent-2"}/>
			</div>
		</form>
	);
};
