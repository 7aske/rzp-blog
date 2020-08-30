import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { CommentInput } from "../../components/commentInput/CommentInput";
import { CommentList } from "../../components/commentList/CommentList";
import { MarkdownContainer } from "../../components/markdown/MarkdownContainer";
import useLocale from "../../hooks/useLocale";
import commentService from "../../services/commentService";
import postService from "../../services/postService";
import Console from "../../utils/Console";
import { formatDate, scrollToTop } from "../../utils/utils";
import localization from "./localization";
import "./PostPage.css";

export const PostPage = () => {
	const [locale] = useLocale();
	const {slug} = useParams();
	const history = useHistory();
	const [post, setPost] = useState<PostDTO>();
	const [comments, setComments] = useState<CommentDTO[]>([]);

	useEffect(() => {
		Console.log(slug);
		postService.getByPostSlug(slug).then(_post => {
			if (_post)
				setPost(_post);
		}).catch(err => {
			Console.error(err);
			history.replace("/404");
		});
		scrollToTop();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (post) getComments(post.idPost);
	}, [post]);

	const getComments = (idPost: number) => {
		commentService.getAllByIdPost(idPost)
			.then(setComments)
			.catch(Console.error);
	};

	const onCommentSubmit = (comment: CommentDTO) => {
		setComments([...comments, comment]);
	}

	return (
		<div id="post" className="container">
			<button className={"btn btn-back"} onClick={history.goBack}>{localization[locale].back}</button>
			{post ?
				<article className="animate__animated animate__fadeIn animate__slow">
					<h2 className="title">{post?.postTitle}</h2>
					<h5 className="author">{post?.postAuthor.toUpperCase()}</h5>
					<h6 className="date">{formatDate(post?.postDatePosted ? post.postDatePosted : "", locale)}</h6>
					<MarkdownContainer content={post?.postBody ? post?.postBody : ""}/>
					<hr/>
					<h4 className="theme-green-text">{localization[locale].commentTitle}</h4>
					<div className="row">
						<div className="col s12 m6">
							<CommentList locale={locale} comments={comments}/>
							<CommentInput idPost={post.idPost} onCommentSubmit={onCommentSubmit}/>
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
