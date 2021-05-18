import * as moment from "moment";
import "moment/locale/sr";
import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import useLocale from "../../../hooks/useLocale";
import { Pagination } from "../../pagination/Pagination";
import localization from "./localization";
import "./PostView.scss";
import PostPreviewService from "../../../services/PostPreview.service";
import { usePageable } from "../../../hooks/usePageable";
import { PostPreview, PostPreviewRecordStatusEnum } from "../../../api/api";
import { Dropdown, Button, Icon, Preloader } from "react-materialize";
import { getPostStatusIcon } from "../../../utils/RecordStatusUtils";
import PostService from "../../../services/Post.service";
import Toast from "../../../utils/Toast";

const postPreviewService = new PostPreviewService();
const postService = new PostService();

export const PostView = () => {
	const [locale] = useLocale();
	const {page, perPage, setPage} = usePageable();
	const pageCount = useRef(0);
	const [posts, setPosts] = useState<PostPreview[]>(new Array(perPage).fill(null));
	const [loading, setLoading] = useState(false);
	moment.locale(locale);

	const getAll = () => {
		setLoading(true);
		postPreviewService.getAllForAdmin(page)
			.then(res => {
				const _posts = new Array(perPage).fill(null).map((_, i) => res.data[i]);
				pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
				setPosts(_posts);
			})
			.catch(() => {
				setPosts([]);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getAll();
		// eslint-disable-next-line
	}, [page]);

	return (
		<div className="admin-post-list">
			<nav>
				<div className="nav-wrapper">
					<ul className="right">
						<li><Link className="btn theme-green" to="/author/posts/edit"><i
							className="material-icons left">add_to_photos</i>
							{localization[locale].newPostButton}</Link></li>
					</ul>
				</div>
			</nav>
			<Preloader active={loading}/>
			<ul className="collection with-header">
				<li className="admin-post-list-item collection-header">
					<div className="row">
						<div className="col s8 l2">
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
						<div className="col s2 l1">
							{localization[locale].headStatus}
						</div>
						<div className="col s3 l2 hide-on-med-and-down">
							{localization[locale].headUpdated}
						</div>
						<div className="col s1 m1 l1">
						</div>
					</div>
				</li>
				{posts.map((post, i) => <AdminPostListItem key={i} post={post} onDeletePost={getAll} locale={locale}/>)}
			</ul>
			<Pagination className={"right"} onPageChange={setPage} pageCount={pageCount.current}/>
		</div>
	);
};

type AdminPostListItemProps = {
	post: PostPreview;
	locale: string;
	onDeletePost: (id: number) => void;
};
const AdminPostListItem = (props: AdminPostListItemProps) => {
	const [post, setPost] = useState(props.post);

	useEffect(() => {
		setPost(props.post);
	}, [props.post]);

	const togglePublished = () => {
		if (post.recordStatus === PostPreviewRecordStatusEnum.Active) {
			postPreviewService.setRecordStatus(post, PostPreviewRecordStatusEnum.Deleted)
				.then(res => {
					Toast.showSuccess(localization[props.locale].success);
					setPost(res.data);
				})
				.catch(err => {
					Toast.showError(err, props.locale);
				});
		} else if (post.recordStatus === PostPreviewRecordStatusEnum.Deleted) {
			postPreviewService.setRecordStatus(post, PostPreviewRecordStatusEnum.Active)
				.then(res => setPost(res.data))
				.catch(err => {
					Toast.showError(err, props.locale);
				});
		}
	};

	const deletePost = () => {
		postService.deleteById(post.id!)
			.then(() => {
				props.onDeletePost(post.id!);
				Toast.showSuccess(localization[props.locale].success);
			})
			.catch(err => {
				Toast.showError(err, props.locale);
			});
	};

	if (post)
		return (
			<li className="admin-post-list-item collection-item">
				<div className="row">
					<div className="col s8 l2 truncate post-edit-container">
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
					<div className="col s2 l1">
						{getPostStatusIcon(post.recordStatus!, props.locale)}
					</div>
					<div className="col s3 l2 hide-on-med-and-down">
						<Moment locale={props.locale} fromNow>{post.lastModifiedDate}</Moment>
					</div>
					<div className="col s1 l1">
						<Dropdown
							id={`post-dropdown-${post.id}`}
							options={{
								constrainWidth: false,
								coverTrigger: true,
							}}
							trigger={<Button className="theme-white-text" flat
							                 node="button"><Icon>more_vert</Icon></Button>}>
							<Link className="btn-edit" to={"/author/posts/edit/" + post.slug}><i
								className="material-icons">edit</i>{localization[props.locale].editPostButton}</Link>
							<a onClick={togglePublished}>
								{post.recordStatus === PostPreviewRecordStatusEnum.Active ?
									<Icon>assignment_late</Icon> : <Icon>assignment</Icon>}
								{post.recordStatus === PostPreviewRecordStatusEnum.Active ? localization[props.locale].unPublish : localization[props.locale].publish}
							</a>
							<a onClick={deletePost}><Icon>delete</Icon>{localization[props.locale].deletePostButton}</a>
						</Dropdown>
					</div>
				</div>
			</li>
		);
	else
		return (<li className="admin-post-list-item collection-item"/>);

};
