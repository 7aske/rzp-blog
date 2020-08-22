import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import adminRoleService from "../../../services/modules/admin/adminRoleService";
import adminUserService from "../../../services/modules/admin/adminUserService";
import userService from "../../../services/userService";
import Console from "../../../utils/Console";
import { GenericChipSelect } from "../../genericSelect/GenericChipSelect";
import GenericElement from "../../genericSelect/GenericElement";
import { MessageList } from "../../messageList/MessageList";
import localization from "./localization";
import "./UserEdit.css";

type UserEditProps = {
	roles: string[];
};
export const UserEdit = (props: UserEditProps) => {
	const history = useHistory();
	const [locale] = useLocale();
	const {idUser} = useParams();
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
	const [roles, setRoles] = useState<Role[]>([]);
	const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>();
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		adminRoleService.getAll().then(_roles => {
			setRoles(_roles);
		}).catch(err => {
			Console.error(err);
		});
	}, []);

	useEffect(() => {
		if (textareaRef) {
			M.textareaAutoResize(textareaRef);
		}
		M.updateTextFields();
		Console.log(user);
		// eslint-disable-next-line
	}, [user]);

	useEffect(() => {
		adminUserService.getById(idUser).then(_user => {
			const u: User = {
				..._user,
				userPassword: "",
				userRoles: _user.userRoles.filter(r => roles.find(r1 => r1.roleName !== r)).map(r => roles.find(r1 => r1.roleName === r)!),
			};
			setUser(u);
		}).catch(err => {
			Console.error(err);
			setUser({...(user as User), userRoles: []});
		});
	}, [idUser, roles]);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...(user as User), [ev.target.id]: ev.target.value});
	};

	const save = () => {
		const _user: User = {...(user as User)};

		let action = _user.idUser ? adminUserService.update : adminUserService.save;
		if (roles.length === 0) action = userService.register;

		action(_user as any).then(() => {
			setMessages([localization[locale].userSavedText]);
			if (roles.length === 0) {
				setTimeout(()=>{history.replace("/login")}, 5000)
			}
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
		<div id="user-edit">
			<div className="row">
				<div className="s12 m12 l8">
					<div className="row">
						<div className="col s12 m12 l8" hidden={roles.length === 0} >
							<div className="input-field col s12 m12 l6">
								<input disabled={true} value={user?.idUser} id="idUser" type="text"
								       onChange={updateProp}/>
								<label form="idUser">{localization[locale].idUserLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<input value={user?.userUsername} id="userUsername" type="text" onChange={updateProp}/>
								<label form="idUser">{localization[locale].userUsernameLabel}</label>
							</div>
						</div>
						{!user?.idUser ?
							<div className="col s12 m12 l8">
								<div className="input-field col s12 m12 l6">
									<input value={user?.userPassword} id="userPassword" type="password"
									       onChange={updateProp}/>
									<label form="idUser">{localization[locale].userPasswordLabel}</label>
								</div>
							</div>
							: ""}
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<input value={user?.userDisplayName} id="userDisplayName" type="text"
								       onChange={updateProp}/>
								<label form="idUser">{localization[locale].userDisplayNameLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<input value={user?.userEmail} id="userEmail" type="text" onChange={updateProp}/>
								<label form="idUser">{localization[locale].userEmailLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<input value={user?.userFirstName} id="userFirstName" type="text"
								       onChange={updateProp}/>
								<label form="idUser">{localization[locale].userFirstNameLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<input value={user?.userLastName} id="userLastName" type="text" onChange={updateProp}/>
								<label form="idUser">{localization[locale].userLastNameLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<input value={user?.userAddress} id="userAddress" type="text" onChange={updateProp}/>
								<label form="idUser">{localization[locale].userAddressLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8">
							<div className="input-field col s12 m12 l6">
								<textarea
									value={user?.userAbout}
									ref={elem => setTextareaRef(elem)}
									id="userAbout"
									className="materialize-textarea" onChange={updateProp}/>
								<label form="idUser">{localization[locale].userAboutLabel}</label>
							</div>
						</div>
						<div className="col s12 m12 l8" hidden={roles.length === 0} >
							<div className="input-field col s12 m12 l6">
								<GenericChipSelect
									onUpdate={elems => setUser({
										...(user as User),
										userRoles: elems.map(elem => ({
											idRole: elem.id,
											roleName: elem.name,
										})),
									})}
									value={user?.userRoles ? user?.userRoles.map(role => new GenericElement<Role>(role, role.idRole, role.roleName)) : []}
									list={roles.map(r => new GenericElement<Role>(r, r.idRole, r.roleName))}/>
							</div>
						</div>
						<div className="col s12">
							<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
							<MessageList className="green accent-2 white-text" messages={messages}/>
						</div>
						<div className="row"/>
						<div className="col s12 m12 l12">
							<button onClick={save} className="btn"
							        name="action">{localization[locale].saveUserButton}
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
