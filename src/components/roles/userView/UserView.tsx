import * as moment from "moment";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useLocale from "../../../hooks/useLocale";
import { Pagination } from "../../pagination/Pagination";
import localization from "./localization";
import "./UserView.scss";
import { User, Role, UserRecordStatusEnum } from "../../../api/api";
import { usePageable } from "../../../hooks/usePageable";
import { Dropdown, Button, Icon } from "react-materialize";
import UserService from "../../../services/User.service";
import { AppContext } from "../../../context/AppContext";
import Toast from "../../../utils/Toast";
import { getUserStatusIcon } from "../../../utils/RecordStatusUtils";

const service = new UserService();

export const UserView = () => {
	const [locale] = useLocale();
	const pageCount = useRef<number>(0);
	const {page, perPage, setPage} = usePageable();
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<User[]>(new Array(perPage).fill(null));
	moment.locale(locale);

	useEffect(() => {
		// eslint-disable-next-line
	}, []);

	const getAllUsers = () => {
		setLoading(true);
		service.getAll(page).then(res => {
			const _users = new Array(perPage).fill(undefined).map((_, i) => res.data[i]);
			pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
			setUsers(_users);
		}).catch(() => {
			setUsers([]);
		})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getAllUsers();
		// eslint-disable-next-line
	}, [page]);

	const handleDeleteUser = () => {
		getAllUsers();
	};

	return (
		<div className="admin-user-list">
			<nav>
				<div className="nav-wrapper">
					<ul className="right">
						<li><Link className="btn theme-green" to="/admin/users/edit"><i
							className="material-icons left">add_to_photos</i>
							{localization[locale].newUserButton}</Link></li>
					</ul>
				</div>
			</nav>
			<ul className="collection with-header">
				<li className="admin-post-list-item collection-header">
					<div className="row">
						<div className="col s6 l2">
							{localization[locale].headUsername}
						</div>
						<div className="col s2 l2 hide-on-med-and-down">
							{localization[locale].headDisplayName}
						</div>
						<div className="col s3 l3 hide-on-med-and-down">
							{localization[locale].headRoles}
						</div>
						<div className="col s3 l3 hide-on-med-and-down">
							{localization[locale].headEmail}
						</div>
						<div className="col s4 l1 center">
							{localization[locale].headActive}
						</div>
						<div className="col s2 l1 center">
						</div>
					</div>
				</li>
				{users.map((user, i) => {
					if (loading) {
						return (<AdminUserListPlaceholder/>);
					} else {
						return (<UserViewListItem onDeleteUser={handleDeleteUser} key={i} user={user}
						                          locale={locale}/>);
					}

				})}
			</ul>
			<Pagination className="right" onPageChange={setPage} pageCount={pageCount.current}/>
		</div>
	);
};


type AdminPostListItemProps = {
	user: User;
	locale: string;
	onDeleteUser: (id: number) => void;
};
const UserViewListItem = (props: AdminPostListItemProps) => {
	const [roles, setRoles] = useState<(Role|null)[]>(new Array(Math.ceil(Math.random() * 3)).fill(null));
	const [user, setUser] = useState(props.user);
	const {ctx} = useContext(AppContext);

	useEffect(() => {
		if (user)
			service.getRoles(user)
				.then(res => setRoles(res.data));
	}, [user]);

	useEffect(() => {
		setUser(props.user);
	}, [props.user]);


	const resetPassword = () => {
		service.resetPassword(user.id!)
			.then(res => {
				Toast.showSuccess(localization[props.locale].successAction);
				setUser(res.data);
			})
			.catch(err => {
				Toast.showError(err, props.locale);

			});
	};

	const deleteUser = () => {
		service.deleteById(user.id!)
			.then(() => {
				Toast.showSuccess(localization[props.locale].successAction);
			})
			.catch(err => {
				Toast.showError(err, props.locale);
			});
	};

	const enableUser = () => {
		service.enableUser(user.id!)
			.then(() => {
				setUser({...user, recordStatus: UserRecordStatusEnum.Active});
				Toast.showSuccess(localization[props.locale].successAction);
			})
			.catch(err => {
				Toast.showError(err, props.locale);
			});
	};

	const disableUser = () => {
		service.disableUser(user.id!)
			.then(() => {
				setUser({...user, recordStatus: UserRecordStatusEnum.Disabled});
				Toast.showSuccess(localization[props.locale].successAction);
			})
			.catch(err => {
				Toast.showError(err, props.locale);
			});
	};

	if (user)
		return (
			<li className="admin-post-list-item collection-item">
				<div className="row">
					<div className="col s6 l2 truncate">
						<span>{user.username}</span>
					</div>
					<div className="col s2 l2 hide-on-med-and-down">
						{user.displayName}
					</div>
					<div className="col s3 l3 hide-on-med-and-down">
						{roles.sort().map(role => {
							if (role)
								return <span key={role.name}
								             className="blob theme-green black-text darken-2">{role.name}</span>;
							else
								return <span style={{width:(Math.ceil(Math.random() * 2 + 4))+"em"}} className="blob role-loading theme-green animate__animated animate__flash animate__delay-1s animate__slower animate__infinite"/>;
						})}
					</div>
					<div className="col s3 l3 hide-on-med-and-down">
						{user.email}
					</div>
					<div className="col s4 l1 center">
						{getUserStatusIcon(user.recordStatus!, props.locale)}
					</div>
					<div className="col s1 l1">
						<Dropdown
							id={`dropdown-${user.id}`}
							options={{
								constrainWidth: false,
								coverTrigger: true,
							}}
							trigger={<Button className="theme-white-text" flat
							                 node="button"><Icon>more_vert</Icon></Button>}>
							<Link className="btn-user-edit" to={"/admin/users/edit/" + user.id}><i
								className="material-icons">edit</i>{localization[props.locale].editUserButton}</Link>
							{ctx.user?.id === user.id ? undefined :
								// eslint-disable-next-line
								<a onClick={resetPassword}>
									<Icon>lock_open</Icon>{localization[props.locale].resetUserButton}
								</a>}
							{ctx.user?.id === user.id ? undefined :
								(user.recordStatus === UserRecordStatusEnum.Disabled ?
									// eslint-disable-next-line
									<a onClick={enableUser}>
										<Icon>check</Icon>{localization[props.locale].enableUserButton}
									</a>
									:
									// eslint-disable-next-line
									<a onClick={disableUser}>
										<Icon>do_not_disturb_on</Icon>{localization[props.locale].disableUserButton}
									</a>)}
							{ctx.user?.id === user.id ? undefined :
								// eslint-disable-next-line
								<a className={ctx.user?.id === user.id ? "hidden" : ""}
								   onClick={deleteUser}><Icon>delete</Icon>{localization[props.locale].deleteUserButton}
								</a>}
						</Dropdown>
					</div>
				</div>
			</li>
		);
	else
		return (<li className="admin-post-list-item collection-item"/>);

};

const AdminUserListPlaceholder = () => {
	return (
		<li className="admin-post-list-item collection-item loading">
			<div className="row animate__animated animate__flash animate__delay-1s animate__slower animate__infinite">
				<div className="col s6 l2 truncate">
					<span className="theme-white" style={{width: (Math.random() * 70 + 30) + "%"}}/>
				</div>
				<div className="col s2 l2 hide-on-med-and-down">
					<span className="theme-white" style={{width: (Math.random() * 70 + 30) + "%"}}/>
				</div>
				<div className="col s3 l3 hide-on-med-and-down">
					<span className="theme-green" style={{width: (Math.random() * 70 + 30) + "%"}}/>
				</div>
				<div className="col s3 l3 hide-on-med-and-down">
					<span className="theme-white" style={{width: (Math.random() * 70 + 30) + "%"}}/>
				</div>
				<div className="col s4 l1 center">
					<span className="icon theme-white"/>
				</div>
				<div className="col s1 l1">
					<Button className="theme-white-text" flat
					        node="button"><Icon>more_vert</Icon></Button>
				</div>
			</div>
		</li>
	);
};
