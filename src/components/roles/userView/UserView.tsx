import * as moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useLocale from "../../../hooks/useLocale";
import Console from "../../../utils/Console";
import { Pagination } from "../../pagination/Pagination";
import localization from "./localization";
import "./UserView.scss";
import { UserControllerApi, User, Role, UserRecordStatusEnum } from "../../../api/api";
import { usePageable } from "../../../hooks/usePageable";

const service = new UserControllerApi();

type UserViewProps = {};
export const UserView = (props: UserViewProps) => {
	const [locale] = useLocale();
	const pageCount = useRef<number>(0);
	const {page, perPage, setPage} = usePageable();
	const [users, setUsers] = useState<User[]>([]);
	moment.locale(locale);

	useEffect(() => {
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		service.getAllUsers(String(page)).then(res => {
			const _users = new Array(perPage).fill(null).map((_, i) => res.data[i]);
			pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
			setUsers(_users);
		}).catch(err => {
			setUsers([]);
			Console.error(err);
		});

		// eslint-disable-next-line
	}, [page]);

	return (
		<div className="admin-user-list">
			<nav>
				<div className="nav-wrapper">
					<ul className="right">
						<li><Link className="btn" to="/admin/users/edit"><i
							className="material-icons left">add_to_photos</i>
							{localization[locale].newUserButton}</Link></li>
					</ul>
				</div>
			</nav>
			<ul className="collection with-header">
				<li className="admin-post-list-item collection-header">
					<div className="row">
						<div className="col s5 m5 l3">
							{localization[locale].headUsername}
						</div>
						<div className="col s2 l2 hide-on-med-and-down">
							{localization[locale].headDisplayName}
						</div>
						<div className="col s5 m5 l3">
							{localization[locale].headRoles}
						</div>
						<div className="col s3 l3 hide-on-med-and-down">
							{localization[locale].headEmail}
						</div>
						<div className="col s2 m2 l1 center">
							{localization[locale].headActive}
						</div>
					</div>
				</li>
				{users.map((user, i) => <UserViewListItem key={i} user={user} locale={locale}/>)}
			</ul>
			<Pagination className="right" onPageChange={setPage} pageCount={pageCount.current}/>
		</div>
	);
};


type AdminPostListItemProps = {
	user: User;
	locale: string;
};
const UserViewListItem = ({user}: AdminPostListItemProps) => {
	const [roles, setRoles] = useState<Role[]>([]);
	useEffect(() => {
		if (user)
			service.getAllUserRoles(user.id!)
				.then(res => setRoles(res.data));
	}, [user]);
	if (user)
		return (
			<li className="admin-post-list-item collection-item">
				<div className="row">
					<div className="col s5 m5 l3 truncate user-edit-container">
						<Link className="btn-user-edit" to={"/admin/users/edit/" + user.id}><i
							className="material-icons">edit</i></Link>
						<span>{user.username}</span>
					</div>
					<div className="col s2 l2 hide-on-med-and-down">
						{user.displayName}
					</div>
					<div className="col s5 m5 l3">
						{roles.sort().map(role =>
							<span key={role.name} className="blob theme-green black-text darken-2">{role.name}</span>)}
					</div>
					<div className="col s3 l3 hide-on-med-and-down">
						{user.email}
					</div>
					<div className="col s2 m2 l1 center">
						{user.recordStatus === UserRecordStatusEnum.Active ?
							<i className="material-icons">check</i> :
							<i className="material-icons">do_not_disturb_on</i>}
					</div>
				</div>
			</li>
		);
	else
		return (<li className="admin-post-list-item collection-item"/>);

};
