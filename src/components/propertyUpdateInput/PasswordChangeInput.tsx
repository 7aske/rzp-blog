import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { getErrorText } from "../../pages/errors/localization";
import { MessageList } from "../messageList/MessageList";
import localization from "./localization";
import UserService from "../../services/User.service";
import useLocale from "../../hooks/useLocale";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import { UserRecordStatusEnum } from "../../api/api";
import { useHistory } from "react-router";

const userService = new UserService();


export const PasswordChangeInput = () => {
	const [locale] = useLocale();
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const {ctx, setCtx} = useContext(AppContext);
	const history = useHistory();

	const updatePassword = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;

		const password = form["password"].value as string;
		const confirm = form["confirm"].value as string;
		const previous = form["previous"].value as string;
		console.dir(form["password"])

		userService.updatePassword({password, previous, confirm})
			.then(() => {
				if (ctx.user?.recordStatus === UserRecordStatusEnum.Expired){
					setMessages([localization[locale].successExpired]);
					setTimeout(()=>{
						Cookies.remove("auth" );
						history.replace("/login");
						setCtx({...ctx, user: null});
					}, 5000);
				} else {
					setMessages([localization[locale].success]);
				}
			})
			.catch(err => {
				console.dir(err);
				if (err.response && err.response.data) {
					setErrors([err.response.data.error]);
				} else {
					setErrors([getErrorText(err.response.data.error, locale)]);
				}
			});

	};

	useEffect(() => {
		M.updateTextFields();
	}, []);

	return (
		<div>
			<form className="row" onSubmit={updatePassword}>
				<div className="input-field col s12">
					<input disabled={ctx.user?.recordStatus === UserRecordStatusEnum.Expired} id="previous" name="previous" type="password"/>
					<label htmlFor="previous">{localization[locale].password}</label>
				</div>
				<div className="input-field col s12">
					<input id="password" name="password" type="password"/>
					<label htmlFor="password">{localization[locale].newPassword}</label>
				</div>
				<div className="input-field col s12">
					<input id="confirm" name="confirm" type="password"/>
					<label htmlFor="confirm">{localization[locale].confirmPassword}</label>
				</div>
				<div className="input-field col s12">
					<button type="submit" className="btn theme-green">{localization[locale].update}</button>
				</div>
			</form>
			<div className="row">
				<MessageList messages={messages} timeout={3000} className={"green accent-2"}/>
				<MessageList messages={errors} timeout={3000} className={"red accent-2"}/>
			</div>
		</div>
	);
};
