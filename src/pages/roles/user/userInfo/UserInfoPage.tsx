import * as React from "react";
import { useContext, ChangeEvent, useState } from "react";
import { User } from "../../../../@types/User";
import MaterializeInput from "../../../../components/materialize/input/MaterializeInput";
import MaterializeTextarea from "../../../../components/materialize/textarea/MaterializeTextarea";
import { MessageList } from "../../../../components/messageList/MessageList";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import { getErrorText } from "../../../errors/localization";
import UserService from "../../../../services/User.service";
import localization from "./localization";

export const UserInfoPage = () => {
	const service = new UserService();
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();
	const [user, setUser] = useState(ctx.user);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	console.log(localization[locale])

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setUser({...(user as User), [ev.target.id]: ev.target.value});
		}
	;
	const save = () => {
		const _user: User = {...(user as User)};
		service.update(_user as any).then(() => {
			setMessages([localization[locale].userSavedText]);
		}).catch(err => {
			setErrors([getErrorText(err, locale)]);
		});
	};

	return (
		<div id="user-edit">
			<div className="row">
				<form onSubmit={ev => ev.preventDefault()} className="col s12 m12 l8">
					<div className="row">
						<MaterializeInput className="col s12 m12 l6" value={user?.username}
						                  id="username" type="text"
						                  onChange={updateProp} label={localization[locale].userUsernameLabel}/>
						<MaterializeInput className="col s12 m12 l6" value={user?.displayName}
						                  id="displayName" type="text"
						                  onChange={updateProp} label={localization[locale].userDisplayNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12" value={user?.email}
						                  id="email" type="text"
						                  onChange={updateProp} label={localization[locale].userEmailLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l6" value={user?.firstName}
						                  id="firstName" type="text"
						                  onChange={updateProp} label={localization[locale].userFirstNameLabel}/>
						<MaterializeInput className="col s12 m12 l6" value={user?.lastName}
						                  id="lastName" type="text"
						                  onChange={updateProp} label={localization[locale].userLastNameLabel}/>
					</div>
					<div className="row">
						<MaterializeTextarea
							className="col s12 m12 l12"
							value={user?.about}
							id="about"
							onChange={updateProp}
							label={localization[locale].userAboutLabel}/>
					</div>
					<div className="row">
						<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
						<MessageList className="green accent-2 white-text" messages={messages}/>
					</div>
					<div className="row">
						<button onClick={save} className="btn theme-green"
						        name="action">{localization[locale].saveUserButton}
							<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
