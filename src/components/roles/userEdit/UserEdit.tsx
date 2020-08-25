import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import adminRoleService from "../../../services/modules/admin/adminRoleService";
import adminUserService from "../../../services/modules/admin/adminUserService";
import Console from "../../../utils/Console";
import { GenericChipSelect } from "../../genericSelect/GenericChipSelect";
import GenericElement from "../../genericSelect/GenericElement";
import MaterializeInput from "../../materialize/input/MaterializeInput";
import MaterializeTextarea from "../../materialize/textarea/MaterializeTextarea";
import { MessageList } from "../../messageList/MessageList";
import localization from "./localization";
import "./UserEdit.css";

type UserEditProps = {
	roles: string[];
};
export const UserEdit = (props: UserEditProps) => {
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
		setUser({...(user as User), [ev.target.id]: ev.target.value, userActive: !(ev.target as any).checked});
	};

	const save = () => {
		const _user: User = {...(user as User)};

		let action = _user.idUser ? adminUserService.update : adminUserService.save;

		action(_user as any).then(() => {
			setMessages([localization[locale].userSavedText]);
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
						<MaterializeInput className="col s12 m12 l8"
						                  disabled={true}
						                  value={user?.idUser}
						                  id="idUser"
						                  type="text"
						                  onChange={updateProp} label={localization[locale].idUserLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.userUsername}
						                  id="userUsername" type="text"
						                  onChange={updateProp} label={localization[locale].userUsernameLabel}/>
					</div>
					{!user?.idUser ?
						<div className="row">
							<MaterializeInput className="col s12 m12 l8" value={user?.userPassword}
							                  id="userPassword" type="password"
							                  onChange={updateProp} label={localization[locale].userPasswordLabel}/>
						</div>
						: ""}
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.userDisplayName}
						                  id="userDisplayName" type="text"
						                  onChange={updateProp} label={localization[locale].userDisplayNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.userEmail}
						                  id="userEmail" type="text"
						                  onChange={updateProp} label={localization[locale].userEmailLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.userFirstName}
						                  id="userFirstName" type="text"
						                  onChange={updateProp} label={localization[locale].userFirstNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.userLastName}
						                  id="userLastName" type="text"
						                  onChange={updateProp} label={localization[locale].userLastNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.userAddress}
						                  id="userAddress" type="text"
						                  onChange={updateProp} label={localization[locale].userAddressLabel}/>
					</div>
					<div className="row">
						<MaterializeTextarea
							className="col s12 m12 l10"
							value={user?.userAbout}
							id="userAbout"
							onChange={updateProp}
							label={localization[locale].userAboutLabel}/>
					</div>
					<div className="row">
						<GenericChipSelect
							className="col s12 m12 l10"
							onUpdate={elems => setUser({
								...(user as User),
								userRoles: elems.map(elem => ({
									idRole: elem.id,
									roleName: elem.name,
								})),
							})}
							labelText={localization[locale].userRolesLabel}
							value={user?.userRoles ? user?.userRoles.map(role => new GenericElement<Role>(role, role.idRole, role.roleName)) : []}
							list={roles.map(r => new GenericElement<Role>(r, r.idRole, r.roleName))}/>
					</div>
					<div className="row">
						<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
						<MessageList className="green accent-2 white-text" messages={messages}/>
					</div>
					<div className="row">
						<div className="col s12">
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
