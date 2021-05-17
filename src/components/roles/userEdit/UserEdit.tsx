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
	}, []);

	useEffect(() => {
		Console.log(user);
		// eslint-disable-next-line
	}, [user]);

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
				Console.error(err);
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
				Console.error(err);
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


	const resetPassword = () => {
		userService.resetPassword(user.id!)
			.then(()=> {
				setMessages([localization[locale].userSavedText]);
			})
			.catch(err => {
				if (err.response && err.response.data) {
					setErrors([err.response.data.error]);
				} else {
					setErrors([getErrorText("generic", locale)]);
				}
			})
	}

	return (
		<div id="user-edit">
			<div className="row">
				<div className="col s12 m12 l8">
					<div className="row">
						<MaterializeInput className="col s12 m12 l8"
						                  disabled={true}
						                  value={user?.id}
						                  id="id"
						                  type="text"
						                  onChange={updateProp} label={localization[locale].idUserLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.username}
						                  id="username" type="text"
						                  onChange={updateProp} label={localization[locale].userUsernameLabel}/>
					</div>
					{/*{!user?.id ?*/}
					{/*	<div className="row">*/}
					{/*		<MaterializeInput className="col s12 m12 l8" value={user?.password}*/}
					{/*		                  id="password" type="password"*/}
					{/*		                  onChange={updateProp} label={localization[locale].userPasswordLabel}/>*/}
					{/*	</div>*/}
					{/*	: ""}*/}
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.displayName}
						                  id="displayName" type="text"
						                  onChange={updateProp} label={localization[locale].userDisplayNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.email}
						                  id="email" type="text"
						                  onChange={updateProp} label={localization[locale].userEmailLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.firstName}
						                  id="firstName" type="text"
						                  onChange={updateProp} label={localization[locale].userFirstNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l8" value={user?.lastName}
						                  id="lastName" type="text"
						                  onChange={updateProp} label={localization[locale].userLastNameLabel}/>
					</div>
					<div className="row">
						<MaterializeTextarea
							className="col s12 m12 l10"
							value={user?.about}
							id="about"
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
							value={user?.roles ? user?.roles.map(role => new GenericElement<Role>(role, role.id!, role.name!)) : []}
							list={roles.map(r => new GenericElement<Role>(r, r.id!, r.name!))}/>
					</div>
					<div className="row">
						<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
						<MessageList className="green accent-2 white-text" messages={messages}/>
					</div>
					<div className="row">
						<button onClick={resetPassword} className="btn theme-grey-light">{localization[locale].resetPassword}
							<i className="material-icons right">clear</i>
						</button>
					</div>
					<div className="row">
							<button onClick={save} className="btn theme-green"
							        name="action">{localization[locale].saveUserButton}
								<i className="material-icons right">send</i>
							</button>
					</div>
				</div>
			</div>
		</div>
	);
};
