import * as React from "react";
import { useContext, ChangeEvent, useState, useEffect } from "react";
import { User } from "../../../../@types/User";
import MaterializeInput from "../../../../components/materialize/input/MaterializeInput";
import MaterializeTextarea from "../../../../components/materialize/textarea/MaterializeTextarea";
import { MessageList } from "../../../../components/messageList/MessageList";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import { getErrorText } from "../../../errors/localization";
import UserService from "../../../../services/User.service";
import localization from "./localization";
import { ContactInputList } from "./contactInput/ContactInputList";
import { Contact } from "../../../../api/api";

export const UserInfoPage = () => {
	const service = new UserService();
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();
	const [user, setUser] = useState(ctx.user);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...(user as User), [ev.target.id]: ev.target.value});
	};

	const save = () => {
		const _user: User = {...(user as User)};
		service.update(_user as any).then(data => {
			setMessages([localization[locale].userSavedText]);
			setUser(data.data as User);
		}).catch(err => {
			setErrors([getErrorText(err, locale)]);
		});
	};

	const handleContactsUpdate = (contacts: Contact[]) => {
		if (user) {
			user.contacts = contacts;
			setUser(user);
		}
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
						<div className="col s12">
							<ContactInputList contacts={user?.contacts} onUpdate={handleContactsUpdate}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
							<MessageList className="green accent-2 theme-black-text" messages={messages}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<button onClick={save} className="btn theme-green"
							        name="action">{localization[locale].saveUserButton}
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
