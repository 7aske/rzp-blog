import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { CommentList } from "../../components/commentList/CommentList";
import { MarkdownContainer } from "../../components/markdown/MarkdownContainer";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import { formatDate, scrollToTop } from "../../utils/utils";
import localization from "./localization";
import "./PostPage.scss";
import PostService from "../../services/Post.service";
import { Post } from "../../api/api";

const postService = new PostService();

export const PostPage = () => {
	const [locale] = useLocale();
	const {slug} = useParams();
	const history = useHistory();
	const [post, setPost] = useState<Post>();

	useEffect(() => {
		Console.log(slug);
		postService.getByPostSlug(slug)
			.then(res => {
				if (res.data)
					setPost(res.data);
			})
			.catch(err => {
				Console.error(err);
				history.replace("/404");
			});
		scrollToTop();

		// eslint-disable-next-line
	}, []);


	return (
		<div id="post" className="container">
			<button className={"btn btn-back"} onClick={history.goBack}>{localization[locale].back}</button>
			{post ?
				<article className="animate__animated animate__fadeIn animate__slow">
					<h2 className="title">{post?.title}</h2>
					<h5 className="author">{post?.user?.displayName?.toUpperCase()}</h5>
					<h6 className="date">{formatDate(post?.createdDate ? post.createdDate : "", locale)}</h6>
					<MarkdownContainer content={post?.body ? post?.body : ""}/>
					<hr/>
					<h4 className="theme-green-text">{localization[locale].commentTitle}</h4>
					<div className="row">
						<div className="col s12 m12 l6">
							<CommentList idPost={post.id!} locale={locale}/>
						</div>
					</div>
				</article>
				: <div className="post-placeholder">
					<div className="title placeholder"/>
					<div className="text placeholder"/>
					<div className="header placeholder"/>
					<div className="text placeholder"/>
					<div className="header placeholder"/>
					<div className="text placeholder"/>
					<div className="header placeholder"/>
					<div className="text placeholder"/>
				</div>}
		</div>
	);
};

