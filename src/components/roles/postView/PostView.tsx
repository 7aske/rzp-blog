import * as moment from "moment";
import "moment/locale/sr";
import React, { useContext, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import useLocale from "../../../hooks/useLocale";
import adminPostService from "../../../services/modules/admin/adminPostService";
import authorPostService from "../../../services/modules/author/authorPostService";
import Console from "../../../utils/Console";
import { Pagination } from "../../pagination/Pagination";
import localization from "./localization";
import "./PostView.css";

type AdminPostListProps = {};
export const PostView = (props: AdminPostListProps) => {
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();
	const itemsPerPage = 10;
	const pageCount = useRef<number>(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [posts, setPosts] = useState<PostPreviewDTO[]>([]);
	moment.locale(locale);

	useEffect(() => {
		let action;
		if (ctx.user && ctx.user.userRoles.indexOf("admin") !== -1) {
			action = adminPostService.getPageCount;
		} else {
			action = authorPostService.getPageCount;
		}
		action(itemsPerPage).then(_count => {
			pageCount.current = _count;
		});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		let action;
		if (ctx.user && ctx.user.userRoles.indexOf("admin") !== -1) {
			action = adminPostService.getAllPreview;
		} else {
			action = authorPostService.getAllPreview;
		}
		action(currentPage, itemsPerPage).then(_posts => {
			_posts = new Array(itemsPerPage).fill(null).map((_, i) => _posts[i]);
			setPosts(_posts);
		}).catch(err => {
			setPosts([]);
			Console.error(err);
		});
		// eslint-disable-next-line
	}, [currentPage]);

	return (
		<div className="admin-post-list">
			<nav>
				<div className="nav-wrapper">
					<ul className="right">
						<li><Link className="btn" to="/admin/posts/edit"><i
							className="material-icons left">add_to_photos</i>
							{localization[locale].newPostButton}</Link></li>
					</ul>
				</div>
			</nav>
			<ul className="collection with-header">
				<li className="admin-post-list-item collection-header">
					<div className="row">
						<div className="col s6 m6 l2">
							{localization[locale].headTitle}
						</div>
						<div className="col s2 hide-on-med-and-down">
							{localization[locale].headSlug}
						</div>
						<div className="col s2 hide-on-med-and-down">
							{localization[locale].headAuthor}
						</div>
						<div className="col s2 hide-on-med-and-down">
							{localization[locale].headCategory}
						</div>
						<div className="col s3 m3 l2">
							{localization[locale].headStatus}
						</div>
						<div className="col s3 m3 l2">
							{localization[locale].headUpdated}
						</div>
					</div>
				</li>
				{posts.map((post, i) => <AdminPostListItem key={i} post={post} locale={locale}/>)}
			</ul>
			<Pagination className={"right"} onPageChange={setCurrentPage} pageCount={pageCount.current}/>
		</div>
	);
};


type AdminPostListItemProps = {
	post: PostPreviewDTO | null;
	locale: string;
};
const AdminPostListItem = ({post, locale}: AdminPostListItemProps) => {
	if (post !== undefined && post !== null) {
		return (
			<li className="admin-post-list-item collection-item">
				<div className="row">
					<div className="col s6 m6 l2 truncate">
						<Link to={"/admin/posts/edit/" + post.postSlug}><i
							className="material-icons">edit</i></Link>
						<Link to={"/posts/" + post.postSlug}>{post.postTitle}</Link>
					</div>
					<div className="col s2 hide-on-med-and-down truncate">
						<Link to={"/posts/" + post.postSlug}>{post.postSlug}</Link>
					</div>
					<div className="col s2 hide-on-med-and-down">
						{post.postAuthor}
					</div>
					<div className="col s2 hide-on-med-and-down">
						<span className="blob grey darken-2">{post.categoryName}</span>
					</div>
					<div className="col s3 m3 l2 truncate">
						{post.postPublished ? localization[locale].published : ""}
					</div>
					<div className="col s3 m3 l2">
						<Moment locale={locale} fromNow>{post.postDateUpdated}</Moment>
					</div>
				</div>
			</li>
		);
	} else {
		return (
			<li style={{border: "none"}} className="admin-post-list-item collection-item">&nbsp;</li>
		);
	}
};
