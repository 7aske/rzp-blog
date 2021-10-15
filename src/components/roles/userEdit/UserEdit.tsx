import "./UserEdit.scss";
import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import Console from "../../../utils/Console";
import GenericElement from "../../genericSelect/GenericElement";
import MaterializeInput from "../../materialize/input/MaterializeInput";
import MaterializeTextarea from "../../materialize/textarea/MaterializeTextarea";
import localization from "./localization";
import useLocale from "../../../hooks/useLocale";
import { GenericChipSelect } from "../../genericSelect/GenericChipSelect";
import { MessageList } from "../../messageList/MessageList";
import { getErrorText } from "../../../pages/errors/localization";
import { useParams } from "react-router";
import UserService from "../../../services/User.service";
import { RoleControllerApi, Role, UserRecordStatusEnum } from "../../../api/api";
import { User } from "../../../@types/User";


type UserEditProps = {
	roles: Role[];
};
export const UserEdit = (props: UserEditProps) => {
	const roleService = new RoleControllerApi();
	const userService = new UserService();

	const [locale] = useLocale();
	const {idUser} = useParams();
	const [user, setUser] = useState<User>({
		id: undefined,
		about: "",
		displayName: "",
		email: "",
		firstName: "",
		lastName: "",
		createdDate: "",
		lastModifiedDate: "",
		recordStatus: UserRecordStatusEnum.Active,
		roles: [],
		username: ""
	});
	const [roles, setRoles] = useState<Role[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		roleService.getAllRoles()
			.then(res => setRoles(res.data))
			.catch(Console.error);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		userService.getById(idUser)
			.then(userRes => {
				setUser({...userRes.data} as User);
				userService.getRoles(userRes.data)
					.then(res => setUser({...userRes.data, roles: res.data}))
					.catch(Console.error);
			})
			.catch(err => {
				Console.error(err);
				setUser({...(user as User), roles: []});

			});
		// eslint-disable-next-line
	}, [idUser, roles]);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...(user as User), [ev.target.id]: ev.target.value});
	};

	const save = () => {
		const _user: User = {...(user as User)};

		if (_user.id) {
			userService.update(_user as any).then(() => {
				setMessages([localization[locale].userSavedText]);
			}).catch(err => {
				if (!err){
					setErrors([getErrorText("generic", locale)]);
					return;
				}
				if (err.response && err.response.data) {
					setErrors([getErrorText(err.response.data.error, locale)]);
				} else {
					setErrors([getErrorText("generic", locale)]);
				}
			});
		} else {
			userService.save(_user as any).then(() => {
				setMessages([localization[locale].userSavedText]);
			}).catch(err => {
				if (!err){
					setErrors([getErrorText("generic", locale)]);
					return;
				}

				setErrors([getErrorText("generic", locale)]);
				if (err.response && err.response.data) {
					setErrors([getErrorText(err.response.data.error, locale)]);
				} else {
					setErrors([getErrorText("generic", locale)]);
				}
			});
		}

	};

	return (
		<div id="user-edit">
			<div className="row">
				<div className="col s12 m12 l8">
					<MaterializeInput className="col s12 m12"
									  disabled={true}
					                  hidden={true}
									  value={user?.id}
									  id="id"
									  type="text"
									  onChange={updateProp}/>
					<div className="row">
						<MaterializeInput className="col s12 m12 l6" value={user?.username}
						                  id="username" type="text"
						                  onChange={updateProp} label={localization[locale].userUsernameLabel}/>
						<MaterializeInput className="col s12 m12 l6" value={user?.displayName}
						                  id="displayName" type="text"
						                  onChange={updateProp} label={localization[locale].userDisplayNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l12" value={user?.email}
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
						<GenericChipSelect
							className="col s12 m12 l12"
							onUpdate={elems => setUser({
								...(user as User),
								roles: elems.map(elem => ({
									id: elem.id,
									name: elem.name,
								})),
							})}
							labelText={localization[locale].userRolesLabel}
							value={user?.roles ? user?.roles.map(role => new GenericElement<Role>(role, role.id!, role.name!)) : []}
							list={roles.map(r => new GenericElement<Role>(r, r.id!, r.name!))}/>
					</div>
					<div className="row">
						<div className="col s12">
							<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
							<MessageList className="green accent-2 white-text" messages={messages}/>
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
				</div>
			</div>
		</div>
	);
};
