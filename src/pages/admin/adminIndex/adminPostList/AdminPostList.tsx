import * as moment from "moment";
import "moment/locale/sr";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Pagination } from "../../../../components/pagination/Pagination";
import useLocale from "../../../../hooks/useLocale";
import adminPostService from "../../../../services/adminPostService";
import postService from "../../../../services/postService";
import "./AdminPostListItem.css";
import localization from "./localization";

type AdminPostListProps = {};
export const AdminPostList = (props: AdminPostListProps) => {
	const [locale] = useLocale();
	const itemsPerPage = 10;
	const pageCount = useRef<number>(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [posts, setPosts] = useState<PostPreviewDTO[]>([]);
	moment.locale(locale);

	useEffect(() => {
		postService.getPageCount(itemsPerPage).then(_count => {
			pageCount.current = _count;
		});
	}, []);

	useEffect(() => {

		adminPostService.getAllPreviews(currentPage, itemsPerPage).then(_posts => {
			_posts = new Array(itemsPerPage).fill(null).map((_, i) => _posts[i]);
			setPosts(_posts);
		}).catch(err => {
			setPosts([]);
			console.error(err);
		});
	}, [currentPage]);

	return (
		<div className="admin-post-list">
			<nav>
				<div className="nav-wrapper">
					<ul className="right">
						<li><Link className="btn" to="sass.html"><i className="material-icons left">add_to_photos</i>
							{localization[locale].newPostButton}</Link></li>
					</ul>
				</div>
			</nav>
			<ul className="collection with-header">
				<li className="admin-post-list-item collection-header">
					<div className="row">
						<div className="col s4">
							{localization[locale].headTitle}
						</div>
						<div className="col s2">
							{localization[locale].headSlug}
						</div>
						<div className="col s2">
							{localization[locale].headCategory}
						</div>
						<div className="col s2">
							{localization[locale].headStatus}
						</div>
						<div className="col s2">
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
					<div className="col s4 truncate">
						<Link to={"/admin/posts/" + post.postSlug}><i
							className="material-icons">edit</i></Link>{post.postTitle}
					</div>
					<div className="col s2">
						<Link to={"/posts/" + post.postSlug}>{post.postSlug}</Link>
					</div>
					<div className="col s2">
						<span className="blob">{post.categoryName}</span>
					</div>
					<div className="col s2">
						{post.postPublished ? "Published" : ""}
					</div>
					<div className="col s2">
						<Moment locale={locale} fromNow>{post.postDateUpdated}</Moment>
					</div>
				</div>
			</li>
		);
	} else {
		return (
			<li style={{border:"none"}} className="admin-post-list-item collection-item">&nbsp;</li>
		);
	}
};