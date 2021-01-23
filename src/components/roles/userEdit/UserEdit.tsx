import "./UserEdit.css";
import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Console from "../../../utils/Console";
import GenericElement from "../../genericSelect/GenericElement";
import MaterializeInput from "../../materialize/input/MaterializeInput";
import MaterializeTextarea from "../../materialize/textarea/MaterializeTextarea";
import RoleService from "../../../services/Role.service";
import localization from "./localization";
import useLocale from "../../../hooks/useLocale";
import { GenericChipSelect } from "../../genericSelect/GenericChipSelect";
import { MessageList } from "../../messageList/MessageList";
import { Role } from "../../../@types/Role";
import { User } from "../../../@types/User";
import { getErrorText } from "../../../pages/errors/localization";
import { useParams } from "react-router";
import UserService from "../../../services/User.service";

const roleService = new RoleService();
const userService = new UserService();

type UserEditProps = {
	roles: string[];
};
export const UserEdit = (props: UserEditProps) => {
	const [locale] = useLocale();
	const {idUser} = useParams();
	const [user, setUser] = useState<User>({
		id: undefined,
		about: "",
		active: true,
		address: "",
		dateCreated: "",
		displayName: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		roles: [],
		username: "",
	});
	const [roles, setRoles] = useState<Role[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		roleService.getAll()
			.then(setRoles)
			.catch(Console.error);
	}, []);

	useEffect(() => {
		Console.log(user);
		// eslint-disable-next-line
	}, [user]);

	useEffect(() => {
		userService.getById(idUser)
			.then(setUser)
			.catch(err => {
				Console.error(err);
				setUser({...(user as User), roles: []});
			});
	}, [idUser, roles]);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...(user as User), [ev.target.id]: ev.target.value, active: !(ev.target as any).checked});
	};

	const save = () => {
		const _user: User = {...(user as User)};

		let action = _user.id ? userService.update : userService.save;

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
				<div className="col s12 m12 l8">
					<div className="row">
						<MaterializeInput className="col s12 m12 l8"
						                  disabled={true}
						                  value={user?.id}
						                  id="idUser"
						                  type="text"
						                  onChange={updateProp} label={localization[locale].idUserLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.username}
						                  id="userUsername" type="text"
						                  onChange={updateProp} label={localization[locale].userUsernameLabel}/>
					</div>
					{!user?.id ?
						<div className="row">
							<MaterializeInput className="col s12 m12 l8" value={user?.password}
							                  id="userPassword" type="password"
							                  onChange={updateProp} label={localization[locale].userPasswordLabel}/>
						</div>
						: ""}
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.displayName}
						                  id="userDisplayName" type="text"
						                  onChange={updateProp} label={localization[locale].userDisplayNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.email}
						                  id="userEmail" type="text"
						                  onChange={updateProp} label={localization[locale].userEmailLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.firstName}
						                  id="userFirstName" type="text"
						                  onChange={updateProp} label={localization[locale].userFirstNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.lastName}
						                  id="userLastName" type="text"
						                  onChange={updateProp} label={localization[locale].userLastNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.address}
						                  id="userAddress" type="text"
						                  onChange={updateProp} label={localization[locale].userAddressLabel}/>
					</div>
					<div className="row">
						<MaterializeTextarea
							className="col s12 m12 l10"
							value={user?.about}
							id="userAbout"
							onChange={updateProp}
							label={localization[locale].userAboutLabel}/>
					</div>
					<div className="row">
						<GenericChipSelect
							className="col s12 m12 l10"
							onUpdate={elems => setUser({
								...(user as User),
								roles: elems.map(elem => ({
									id: elem.id,
									name: elem.name,
								})),
							})}
							labelText={localization[locale].userRolesLabel}
							value={user?.roles ? user?.roles.map(role => new GenericElement<Role>(role, role.idRole, role.roleName)) : []}
							list={roles.map(r => new GenericElement<Role>(r, r.id!, r.name))}/>
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
