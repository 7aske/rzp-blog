import * as moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import useLocale from "../../../hooks/useLocale";
import Console from "../../../utils/Console";
import { Pagination } from "../../pagination/Pagination";
import localization from "./localization";
import "./UserView.css";
import { User } from "../../../@types/User";
import UserService from "../../../services/User.service";
import { Role } from "../../../@types/Role";

const userService = new UserService();

type UserViewProps = {};
export const UserView = (props: UserViewProps) => {
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();
	const itemsPerPage = 10;
	const pageCount = useRef<number>(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [users, setUsers] = useState<User[]>([]);
	moment.locale(locale);

	useEffect(() => {
		userService.getPageCount({count: itemsPerPage}).then(_count => {
			pageCount.current = _count;
		});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		userService.getAll().then(_users => {
			// _users = new Array(itemsPerPage).fill(null).map((_, i) => _users[i]);
			setUsers(_users);
		}).catch(err => {
			setUsers([]);
			Console.error(err);
		});

		// eslint-disable-next-line
	}, [currentPage]);

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
			<Pagination className="right" onPageChange={setCurrentPage} pageCount={pageCount.current}/>
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
		userService.getRoles(user)
			.then(setRoles);
	}, [user]);
		return (
			<li className="admin-post-list-item collection-item">
				<div className="row">
					<div className="col s5 m5 l3 truncate">
						<Link to={"/admin/users/edit/" + user.id}><i
							className="material-icons">edit</i></Link>{user.username}
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
						{user.recordStatus === 1 ?
							<i className="material-icons">check</i> :
							<i className="material-icons">do_not_disturb_on</i>}
					</div>
				</div>
			</li>
		);
};
