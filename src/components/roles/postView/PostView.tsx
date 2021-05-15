import * as moment from "moment";
import "moment/locale/sr";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import useLocale from "../../../hooks/useLocale";
import { Pagination } from "../../pagination/Pagination";
import localization from "./localization";
import "./PostView.scss";
import PostService from "../../../services/Post.service";
import PostPreviewService from "../../../services/PostPreview.service";
import { usePageable } from "../../../hooks/usePageable";
import { PostPreview, PostRecordStatusEnum, PostPreviewRecordStatusEnum } from "../../../api/api";

const postService = new PostService();
const postPreviewService = new PostPreviewService();

export const PostView = () => {
	const [locale] = useLocale();
	const {page, perPage, setPage} = usePageable();
	const pageCount = useRef<number>(0);
	const [posts, setPosts] = useState<PostPreview[]>([]);
	moment.locale(locale);


	useEffect(() => {
		postPreviewService.getAll(pageCount.current)
			.then(res => {
				const _posts = new Array(perPage).fill(null).map((_, i) => res.data[i]);
				pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
				setPosts(_posts);
			})
			.catch(() => {
				setPosts([]);
			});
		// eslint-disable-next-line
	}, [page]);

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
			<Pagination className={"right"} onPageChange={setPage} pageCount={pageCount.current}/>
		</div>
	);
};


type AdminPostListItemProps = {
	post: PostPreview;
	locale: string;
};
const AdminPostListItem = ({post, locale}: AdminPostListItemProps) => {
	if (post)
		return (
			<li className="admin-post-list-item collection-item">
				<div className="row">
					<div className="col s6 m6 l2 truncate">
						<Link to={"/admin/posts/edit/" + post.slug}><i
							className="material-icons">edit</i></Link>
						<Link to={"/posts/" + post.slug}>{post.title}</Link>
					</div>
					<div className="col s2 hide-on-med-and-down truncate">
						<Link to={"/posts/" + post.slug}>{post.slug}</Link>
					</div>
					<div className="col s2 hide-on-med-and-down">
						{post?.user?.displayName}
					</div>
					<div className="col s2 hide-on-med-and-down">
						<span className="blob grey darken-2">{post.category?.name}</span>
					</div>
					<div className="col s3 m3 l2 truncate">
						{post.recordStatus === PostPreviewRecordStatusEnum.Active ? localization[locale].published : ""}
					</div>
					<div className="col s3 m3 l2">
						<Moment locale={locale} fromNow>{post.lastModifiedDate}</Moment>
					</div>
				</div>
			</li>
		);
	else
		return (<li className="admin-post-list-item collection-item"/>);

};
